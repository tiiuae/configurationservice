import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest} from './login-request';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginRequest: LoginRequest;
  isError: boolean;
  submitted = false;
  constructor(private authService: AuthService,private router: Router) { 
    this.loginRequest = {
      username: '',
      password: ''
    };
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    
  }
  get f() { return this.loginForm.controls; }

  login() {
console.log("s")
    this.submitted = true;
    if (this.loginForm.invalid) {
    return false;
      }

    this.loginRequest.username = this.loginForm.get('username').value;
    this.loginRequest.password = this.loginForm.get('password').value;

    this.authService.login(this.loginRequest).subscribe(data => {
      if(data){
        this.isError = false;
        this.router.navigateByUrl('/device-list');
     //   this.toastr.success('Login Successful');
  
      }
         else{
          this.isError = true;
         }
      
       
     
    },
    err => {
      this.isError = true;

    });
   
  }

}
