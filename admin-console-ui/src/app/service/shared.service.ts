import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  sharingData = { ip: " " ,mac:""};
  constructor() { }

  setData(data){
    this.sharingData = data;
  }
  getData(){
    return this.sharingData;
  }
}
