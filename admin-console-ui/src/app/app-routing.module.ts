import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminListComponent } from './admin-list/admin-list.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DeviceConfigComponent } from './device-config/device-config.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

import { GroupListComponent } from './group-list/group-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { LoggedinGuard } from './guard/loggedin.guard';
import { AdminGuard } from './guard/admin.guard';
import { UserGuard } from './guard/user.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'user-list', component: UserListComponent ,canActivate: [AdminGuard]},
   { path: 'admin-list', component: AdminListComponent ,canActivate: [AdminGuard]},
   { path: 'group-list', component: GroupListComponent ,canActivate: [LoggedinGuard]},
  { path: 'device-list', component: DeviceListComponent,canActivate: [LoggedinGuard] },
  { path: 'device-config', component: DeviceConfigComponent,canActivate: [LoggedinGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'change-password', component: ChangePasswordComponent,canActivate: [LoggedinGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
