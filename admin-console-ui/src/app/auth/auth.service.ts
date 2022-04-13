import { EventEmitter, Injectable, Output } from '@angular/core';
import { LoginRequest } from './login/login-request';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from './login/login-response';
import { LocalStorageService } from 'ngx-webstorage';
import { map, tap ,catchError} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RegisterDTO } from './register/register-dto';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  register(registerRequest: RegisterDTO) {
    return this.httpClient.post<any>(this.API_URL+'/api/auth/registration/user', registerRequest)
    .pipe(map(data => {
     return true;
    
    }));
  }
  private API_URL = environment.API_URL;
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();
  @Output() employer: EventEmitter<boolean> = new EventEmitter();
  @Output() candidate: EventEmitter<boolean> = new EventEmitter();
  @Output() siteAdmin: EventEmitter<boolean> = new EventEmitter();
  @Output() coreAdmin: EventEmitter<boolean> = new EventEmitter();
  private roles: Array<string> = [];
  constructor(private httpClient: HttpClient,private localStorage: LocalStorageService) { }

  
  login(loginRequest: LoginRequest): Observable<boolean> {
    return this.httpClient.post<LoginResponse>(this.API_URL+'/api/auth/login', loginRequest)
      .pipe(map(data => {
       // console.log(data)
      
        this.localStorage.store('authenticationToken', data.authenticationToken);
      this.localStorage.store('username', data.username);
      //this.localStorage.store('refreshToken', data.refreshToken);
      this.localStorage.store('expiresAt', data.expiresAt);
      this.localStorage.store('roles', JSON.stringify(data.roles));
      this.loggedIn.emit(true);
      this.username.emit(data.username);
      this.candidate.emit(true);
      return true;
      }));
  }

  logout() {
    
   this.clearLocal();
  }
 clearLocal(){
  this.localStorage.clear('authenticationToken');
  this.localStorage.clear('username');
  this.localStorage.clear('refreshToken');
  this.localStorage.clear('expiresAt');
  this.localStorage.clear('roles');
  this.localStorage.clear('uid');
 }
  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }

  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  getUserName() {
    return this.localStorage.retrieve('username');
  }

  getExpirationTime() {
    return this.localStorage.retrieve('expiresAt');
  }
  getRoles():string[] {
    this.roles = [];

    if (this.isLoggedIn()) {
      JSON.parse(this.localStorage.retrieve('roles')).forEach(authority => {
        this.roles.push(authority);
      });
    }

    return this.roles;  }
  
  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }
  isUser() : boolean {
  return this.getRoles().includes('ROLE_USER')
  }
  isAdmin() : boolean {
    return this.getRoles().includes('ROLE_ADMIN')
    }
}
