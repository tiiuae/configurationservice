import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { RegisterDTO } from '../register/register-dto';
import { CustomValidators } from 'src/app/custom-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  registerRequest: RegisterDTO;
  isError: boolean;
  submitted = false;
  constructor(private authService: AuthService,private router: Router,private formBuilder: FormBuilder) { 
    this.registerRequest = {
      username: '',
      password: '',passwordConfirm:''
    };
  }

  ngOnInit(): void {
    // this.registerForm = new FormGroup({
    //   username: new FormControl('', Validators.required),
    //   password: new FormControl('', Validators.required),
    //   passwordConfirm: new FormControl('', Validators.required)
    // });
    this.registerForm = this.formBuilder.group({
     
      username: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: new FormControl('', Validators.required)
    } ,
    {
      // check whether our password and confirm password match
      validator : CustomValidators.MatchPassword
   } );
    
  }
  get f() { return this.registerForm.controls; }

  register() {

    this.submitted = true;
    if (this.registerForm.invalid) {
    return false;
      }

    this.registerRequest.username = this.registerForm.get('username').value;
    this.registerRequest.password = this.registerForm.get('password').value;
    this.registerRequest.passwordConfirm = this.registerForm.get('passwordConfirm').value;

    this.authService.register(this.registerRequest).subscribe(data => {
      if(data){
        this.isError = false;
        this.router.navigateByUrl('/login');
     //   this.toastr.success('Register Successful');
  
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
