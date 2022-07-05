import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { catchError, switchMap, take, filter } from 'rxjs/operators';
import { LoginResponse } from './auth/login/login-response';


@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

    isTokenRefreshing = false;
    refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(public authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
            if (req.headers.get("skip"))
            return next.handle(req);
 
            
        if (req.url.indexOf('refresh') !== -1 || req.url.indexOf('login') !== -1) {
            return next.handle(req);
        }
        const jwtToken = this.authService.getJwtToken();

        if (jwtToken) {
            return next.handle(this.addToken(req, jwtToken)).pipe(catchError(error => {
                if (error instanceof HttpErrorResponse
                    && (error.status === 403 || (error.status===500 && 
                        error.error.message.startsWith("JWT expired")))) {
                   
                 //   return this.handleAuthErrors(req, next);
                } 
                else if (error instanceof HttpErrorResponse
                    && (error.status===500 && 
                        error.error.message==='username not found')) {
                   
                 //   this.authService.logout();
                    location.reload();
                } 
                else {
                    return throwError(error);
                }
            }));
        }
        return next.handle(req);

    }

    // private handleAuthErrors(req: HttpRequest<any>, next: HttpHandler)
    //     : Observable<HttpEvent<any>> {
    //     if (!this.isTokenRefreshing) {
    //         this.isTokenRefreshing = true;
    //         this.refreshTokenSubject.next(null);

    //         return this.authService.refreshToken().pipe(
    //             switchMap((refreshTokenResponse: LoginResponse) => {
    //                 this.isTokenRefreshing = false;
    //                 this.refreshTokenSubject
    //                     .next(refreshTokenResponse.authenticationToken);
    //                 return next.handle(this.addToken(req,
    //                     refreshTokenResponse.authenticationToken));
    //             })
    //         )
    //     } else {
    //         return this.refreshTokenSubject.pipe(
    //             filter(result => result !== null),
    //             take(1),
    //             switchMap((res) => {
    //                 return next.handle(this.addToken(req,
    //                     this.authService.getJwtToken()))
    //             })
    //         );
    //     }
    // }

    addToken(req: HttpRequest<any>, jwtToken: any) {
        return req.clone({
            headers: req.headers.set('Authorization',
                'Bearer ' + jwtToken)
        });
    }

    
}