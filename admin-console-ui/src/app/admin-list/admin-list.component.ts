import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { UserDTO } from '../model/user-dto';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {

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
    this.userForm= new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

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
  loadUsers() {

    this.userService.findAdmins()
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
     password: new FormControl('')
    }
    );
  }

  get w() { return this.userForm.controls; }

  updateUser(){
    this.submitted = true;
    if (this.userForm.invalid) {
      return false;
      }

    this.user.username = this.userForm.get('username').value;
    

    this.userService.updateUser( this.user)
    .subscribe(data => {
      $("#userModal").modal("hide");
      this.loadUsers();
    }, error => {
      console.log(error);
    });

  }


  createUser(){
console.log(this.userForm.value)
console.log(this.user)
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
