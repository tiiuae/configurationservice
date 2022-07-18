import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { HeaderComponent } from './header/header.component';
import { UserListComponent } from './user-list/user-list.component';
import { TokenInterceptor } from './token-interceptor';
import { AdminListComponent } from './admin-list/admin-list.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceConfigComponent } from './device-config/device-config.component';
import { GroupListComponent } from './group-list/group-list.component';
import { RegisterComponent } from './auth/register/register.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    UserListComponent,
    AdminListComponent,
    DeviceListComponent,
    DeviceConfigComponent,
    GroupListComponent,
    RegisterComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule ,  HttpClientModule, NgxWebstorageModule.forRoot(),FormsModule
  ],
  providers: [ {
     
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,
    
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
