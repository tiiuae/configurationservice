  
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {



 
  
  static MatchPassword(control: AbstractControl) {
    let password = control.get('password').value;

    let confirmpassword = control.get('passwordConfirm').value;

     if(password != confirmpassword) {
      if(!control.get('passwordConfirm').pristine){
         control.get('passwordConfirm').setErrors( {NoPassswordMatch: true} );}
     } else {
         return null
     }
 }






}