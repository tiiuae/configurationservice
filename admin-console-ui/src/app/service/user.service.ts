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
import {UUIDDTO} from '../model/uuid-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) { }
  private API_URL = environment.API_URL;
  // tslint:disable-next-line:typedef
  applyConfig(configPaylod: DeviceDTO) {
    return this.httpClient.post
    (this.API_URL + '/api/apply-config', configPaylod  );
  }
  // tslint:disable-next-line:typedef
  changePassword(passwordChange: PasswordChangeDTO) {
    return this.httpClient.put
    (this.API_URL + '/api/change-password', passwordChange  );
  }
  // tslint:disable-next-line:typedef

  // tslint:disable-next-line:typedef
  createUser(user: UserDTO) {
    return this.httpClient.post
    (this.API_URL + '/api/admin/user', user  );
  }
  // tslint:disable-next-line:typedef
  updateUser(user: UserDTO) {
    return this.httpClient.put
    (this.API_URL + '/api/admin/user', user  );
  }



  findUsers(): Observable<ResponseDTO<UserDTO[]>> {
    return this.httpClient.get<ResponseDTO<UserDTO[]>>(this.API_URL + '/api/admin/users');
  }

  findAdmins(): Observable<ResponseDTO<UserDTO[]>> {
    return this.httpClient.get<ResponseDTO<UserDTO[]>>(this.API_URL + '/api/admin/admins');
  }

  createUUID(): Observable<ResponseDTO<UUIDDTO[]>> {
    return this.httpClient.get<ResponseDTO<UUIDDTO[]>>(this.API_URL + '/api/createUUID');
  }


  findDevices(): Observable<ResponseDTO<DeviceDTO[]>> {
    return this.httpClient.get<ResponseDTO<DeviceDTO[]>>(this.API_URL + '/api/devices');
  }

  // tslint:disable-next-line:typedef
  addConfig(config: ConfigDTO) {
    return this.httpClient.post
    (this.API_URL + '/api/device/config', config  );
  }

  // tslint:disable-next-line:typedef
  createGroup(group: GroupDTO) {
    return this.httpClient.post
    (this.API_URL + '/api/admin/group', group  );
  }
  // tslint:disable-next-line:typedef
  updateGroup(group: GroupDTO) {
    return this.httpClient.put
    (this.API_URL + '/api/admin/group', group  );
  }
  findGroups(): Observable<ResponseDTO<GroupDTO[]>> {
    return this.httpClient.get<ResponseDTO<GroupDTO[]>>(this.API_URL + '/api/admin/groups');
  }


  // tslint:disable-next-line:typedef
  deleteUser(userId: number) {
    return this.httpClient.delete<any>(this.API_URL + '/api/users/' + userId);
  }

}
