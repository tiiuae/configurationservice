import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { UserDTO } from '../model/user-dto';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../custom-validator';

declare var $: any;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userList : UserDTO[]
 userForm: FormGroup;
  submitted = false;
  user:UserDTO;
  constructor(private userService:UserService,private fb: FormBuilder ) { 

    this.user = {
      userId:0,
      username :'',
      password: '',
        active:true}
  }

  ngOnInit(): void {
    this.loadUsers();
    setTimeout(() => {
      $("#example1").DataTable({
        "responsive": true, "lengthChange": false, "autoWidth": false,
        "buttons": ["pdf", "print"]
      }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
  
     
  }, 500);
    this.userForm=this.fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      passwordConfirm: new FormControl('', Validators.required)
    }  ,
    {
      // check whether our password and confirm password match
      validator : CustomValidators.MatchPassword
   } );
  }


  loadUsers() {

    this.userService.findUsers()
    .subscribe(data => {
     this.userList= data.data;
   }, error => {
      console.log(error);
    });
   }


   editUser(userEdit:UserDTO){
    this.user=userEdit;

    this.userForm= this.fb.group({
      username:new FormControl(userEdit.username,Validators.required),
     password: new FormControl('', Validators.required),
     passwordConfirm: new FormControl('', Validators.required)
    }  ,
    {
      // check whether our password and confirm password match
      validator : CustomValidators.MatchPassword
   } );
  }

  get w() { return this.userForm.controls; }

  deleteUser(userEdit:UserDTO)
{
  if(confirm("Delete User ? ")) {

  this.userService.deleteUser(userEdit.userId)
  .subscribe(data => {
    this.loadUsers();
 }, error => {
    console.log(error);
  });
}
}
  updateUser(){
    this.submitted = true;
    if (this.userForm.invalid) {
      return false;
      }

    this.user.username = this.userForm.get('username').value;
    this.user.password = this.userForm.get('password').value;
    

    this.userService.updateUser( this.user)
    .subscribe(data => {
      $("#userModal").modal("hide");
      this.loadUsers();
    }, error => {
      console.log(error);
    });

  }


  createUser(){

    this.submitted = true;
    if (this.userForm.invalid) {
      return false;
      }

    this.user.username = this.userForm.get('username').value;
    this.user.password = this.userForm.get('password').value;


    this.userService.createUser(this.user)
    .subscribe(data => {
      $("#userCreateModal").modal("hide");
      this.loadUsers();
    }, error => {
      console.log(error);
    });

  }


}
