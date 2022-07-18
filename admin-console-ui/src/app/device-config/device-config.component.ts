import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { ConfigDTO } from '../model/config-dto';
import { SharedService } from '../service/shared.service';
import { UserService } from '../service/user.service';
import {UUIDDTO} from '../model/uuid-dto';

@Component({
  selector: 'app-device-config',
  templateUrl: './device-config.component.html',
  styleUrls: ['./device-config.component.css']
})
export class DeviceConfigComponent implements OnInit {
  deviceForm: FormGroup;
  configPaylod: ConfigDTO;
  uuid: UUIDDTO[];
  mac: string;
  ip: string;
  sharingData = { ip: ' ' , mac: ''};
  constructor(private fb: FormBuilder, private userService: UserService, private activateRoute: ActivatedRoute, private router: Router,
              private sharedService: SharedService) {

    this.deviceForm = this.fb.group({

      configs: this.fb.array([]) ,
    });
  }

  ngOnInit(): void {
    this.sharingData = this.sharedService.getData();
    this.ip = this.sharingData.ip;
    this.mac = this.sharingData.mac;

     }
  configs(): FormArray {
    return this.deviceForm.get('configs') as FormArray;
  }

  newConfig(): FormGroup {
    // @ts-ignore
    return this.fb.group({
      set_hostname: 'True',
      disable_networking: 'True',
      mesh_service: 'True',
      gw_service: '',
      dflt_service: 'True',
      mesh_inf: 'wlp',
      gw_inf: 'wla',
      mesh_infs: 'w1',
      api_version: '1',
      ssid: 'gold',
      key: '',
      enc: 'SAE',
      ap_mac: '00:11:22:33:44:55',
      country: 'AE',
      frequency: '5180',
      subnet: '255.255.255.0',
      tx_power: '30',
      mode: 'mesh',
      type: '11s',
      ip: '',
      uuid2: localStorage.uuid,
    });
  }

  // tslint:disable-next-line:typedef
  addConfig() {
    this.configs().push(this.newConfig());
  }

  // tslint:disable-next-line:typedef
  removeConfig(i: number) {
    this.configs().removeAt(i);
  }

  // tslint:disable-next-line:typedef
  createUUID(){
     this.userService.createUUID().subscribe(data => {
      this.uuid = data.data;
      localStorage.uuid = JSON.stringify(this.uuid);
      // console.log(JSON.parse(localStorage.uuid));
    }, error => {
       console.log(error);
     });
  }
  // tslint:disable-next-line:typedef
  onSubmit() {
    this.configPaylod = new ConfigDTO(this.deviceForm.value);
    this.configPaylod.mac = this.mac;
    this.configPaylod.ip = this.ip;
    this.userService.addConfig(this.configPaylod)
    .subscribe(data => {
      localStorage.clear();
      this.router.navigateByUrl('/device-list');

    }, error => {
      console.log(error);
    });

  }
}
