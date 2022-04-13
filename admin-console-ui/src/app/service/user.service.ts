import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO } from '../model/user-dto';
import { ResponseDTO } from '../model/response-dto';
import { environment } from 'src/environments/environment';
import { DeviceDTO } from '../model/device-dto';
import { ConfigDTO } from '../model/config-dto';
import { GroupDTO } from '../model/group-dto';
import { PasswordChangeDTO } from '../model/password-change-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  applyConfig(configPaylod: DeviceDTO) {
    return this.httpClient.post
    (this.API_URL+'/api/apply-config', configPaylod  );
  }
  changePassword(passwordChange: PasswordChangeDTO) {
    return this.httpClient.put
    (this.API_URL+'/api/change-password', passwordChange  );
  }
  createUser(user: UserDTO) {
    return this.httpClient.post
    (this.API_URL+'/api/admin/user', user  );
  }
  updateUser(user: UserDTO) {
    return this.httpClient.put
    (this.API_URL+'/api/admin/user', user  );
  }
  private API_URL = environment.API_URL;
  constructor(private httpClient: HttpClient) { }

  findUsers(): Observable<ResponseDTO<UserDTO[]>> {
    return this.httpClient.get<ResponseDTO<UserDTO[]>>(this.API_URL + '/api/admin/users');
  }

  findAdmins(): Observable<ResponseDTO<UserDTO[]>> {
    return this.httpClient.get<ResponseDTO<UserDTO[]>>(this.API_URL + '/api/admin/admins');
  }

  
  findDevices(): Observable<ResponseDTO<DeviceDTO[]>> {
    return this.httpClient.get<ResponseDTO<DeviceDTO[]>>(this.API_URL + '/api/devices');
  }

  addConfig(config: ConfigDTO) {
    return this.httpClient.post
    (this.API_URL+'/api/device/config', config  );
  }

  createGroup(group: GroupDTO) {
    return this.httpClient.post
    (this.API_URL+'/api/admin/group', group  );
  }
  updateGroup(group: GroupDTO) {
    return this.httpClient.put
    (this.API_URL+'/api/admin/group', group  );
  }
  findGroups(): Observable<ResponseDTO<GroupDTO[]>> {
    return this.httpClient.get<ResponseDTO<GroupDTO[]>>(this.API_URL + '/api/admin/groups');
  }

  
  deleteUser(userId: number) {
    return this.httpClient.delete<any>(this.API_URL + '/api/users/'+userId);
  }

}
