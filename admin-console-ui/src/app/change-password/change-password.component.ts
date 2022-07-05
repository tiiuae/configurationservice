import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CustomValidators } from '../custom-validator';
import { PasswordChangeDTO } from '../model/password-change-dto';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  userForm: FormGroup;
  passwordChange:PasswordChangeDTO;
  isError: boolean;
  submitted = false;
  constructor(private authService: AuthService,
    private formBuilder: FormBuilder,private userService: UserService,private router: Router) { 
    this.passwordChange = {
      username: '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',

    };
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
     
      username: [this.authService.getUserName(), Validators.required],
      currentpassword: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: new FormControl('', Validators.required)
    } ,
    {
      // check whether our password and confirm password match
      validator : CustomValidators.MatchPassword
   } );
    
    
  }
  get f() { return this.userForm.controls; }

  changePassword(){
  
    this.submitted = true;
    if (this.userForm.invalid) {
      return false;
      }
  
    this.passwordChange.username = this.userForm.get('username').value;
    this.passwordChange.currentPassword = this.userForm.get('currentpassword').value;
    this.passwordChange.newPassword = this.userForm.get('password').value;
  
  
    this.userService.changePassword( this.passwordChange)
    .subscribe(data => {
    
      this.router.navigateByUrl('/device-list');
    }, error => {
      console.log(error);
    });
  }

}
