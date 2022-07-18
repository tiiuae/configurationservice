import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { SharedService } from '../service/shared.service';
import { DeviceDTO } from '../model/device-dto';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigDTO } from '../model/config-dto';
import { KeyValueDTO } from '../model/key-value';
declare var $: any;

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {


 deviceList: DeviceDTO[];
 deviceForm: FormGroup;
  submitted = false;
  sharingData = { ip: ' ' , mac: ''};
  configPaylod: DeviceDTO;
  key: KeyValueDTO;
  constructor(private userService: UserService, private fb: FormBuilder , private router: Router,
              private sharedService: SharedService) {
      this.configPaylod = {
        mac: '',
        ip: '',
        type: ''
      };

  }

  ngOnInit(): void {
    this.loadDevices();
    setTimeout(() => {
      $('#example1').DataTable({
        responsive: true, lengthChange: false, autoWidth: false,
        buttons: ['pdf', 'print']
      }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');


  }, 500);




  }


    // tslint:disable-next-line:typedef
  loadDevices() {

    this.userService.findDevices()
    .subscribe(data => {
     this.deviceList = data.data;
   }, error => {
      console.log(error);
    });
   }

// tslint:disable-next-line:typedef
deviceConfig(device: DeviceDTO){
  this.sharingData.ip = device.ip;
  this.sharingData.mac = device.mac;

  this.sharedService.setData(this.sharingData);
  this.router.navigate(['device-config']);

}

// tslint:disable-next-line:typedef
applyConfig(device: DeviceDTO){

  this.configPaylod.mac = device.mac;
  this.configPaylod.ip = device.ip;
  console.log(this.configPaylod);
  this.userService.applyConfig(this.configPaylod)
    .subscribe(data => {
      this.loadDevices();



    }, error => {
      console.log(error);
    });

  }





}
