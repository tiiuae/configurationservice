import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CustomValidators } from '../custom-validator';
import { PasswordChangeDTO } from '../model/password-change-dto';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean;
  username: string;
  isUser : boolean;
  isAdmin : boolean;
  userForm: FormGroup;
  passwordChange:PasswordChangeDTO;
  isError: boolean;
  submitted = false;
  constructor(private authService: AuthService,private router: Router,
    private formBuilder: FormBuilder,private userService: UserService) { }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.authService.username.subscribe((data: string) => this.username = data);
    this.authService.employer.subscribe((data: boolean) => this.isUser = data);
    this.authService.candidate.subscribe((data: boolean) => this.isAdmin = data);    
    this.isUser = this.authService.isUser();
    this.isAdmin = this.authService.isAdmin();
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUserName();
    this.userForm = this.formBuilder.group({
     
      username: [this.username , Validators.required],
      currentpassword: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: new FormControl('', Validators.required)
    } ,
    {
      // check whether our password and confirm password match
      validator : CustomValidators.MatchPassword
   } );
    
   
  }
  get w() { return this.userForm.controls; }


  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('');
  }
passwordModal(){
  this.userForm.controls['username'].setValue( this.authService.getUserName);

}
 

}
