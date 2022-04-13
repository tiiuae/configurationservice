import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { ConfigDTO } from '../model/config-dto';
import { SharedService } from '../service/shared.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-device-config',
  templateUrl: './device-config.component.html',
  styleUrls: ['./device-config.component.css']
})
export class DeviceConfigComponent implements OnInit {
 
    
  deviceForm: FormGroup;  
  configPaylod:ConfigDTO;   
  mac:string;
  ip:string;
  sharingData = { ip: " " ,mac:""};
  constructor(private fb:FormBuilder,private userService:UserService,private activateRoute : ActivatedRoute,private router: Router,
    private sharedService:SharedService) {  
     
    this.deviceForm = this.fb.group({  
   
      configs: this.fb.array([]) ,  
    });  
  }  
    
  ngOnInit(): void {
    this.sharingData=this.sharedService.getData();
    this.ip=this.sharingData.ip;
    this.mac=this.sharingData.mac;

     }
  configs() : FormArray {  
    return this.deviceForm.get("configs") as FormArray  
  }  
     
  newConfig(): FormGroup {  
    return this.fb.group({  
      key: '',  
      value: '',  
    })  
  }  
     
  addConfig() {  
    this.configs().push(this.newConfig());  
  }  
     
  removeConfig(i:number) {  
    this.configs().removeAt(i);  
  }  
     
  onSubmit() {  
    console.log(this.deviceForm.value);  
this.configPaylod=new ConfigDTO(this.deviceForm.value);
this.configPaylod.mac=this.mac;
this.configPaylod.ip=this.ip;
    this.userService.addConfig(this.configPaylod)
    .subscribe(data => {
      this.router.navigateByUrl('/device-list');

    }, error => {
      console.log(error);
    });

  }  
}
