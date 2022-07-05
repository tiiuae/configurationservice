import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { GroupDTO } from '../model/group-dto';
declare var $: any;

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {


  groupList : GroupDTO[]
groupForm: FormGroup;
  submitted = false;
  group:GroupDTO;
  constructor(private userService:UserService,private fb: FormBuilder ) { 

    this.group = {
      groupId:0,
      groupName :'',
    
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
    this.groupForm= new FormGroup({
      name: new FormControl('', Validators.required),
    });
  }


  loadUsers() {

    this.userService.findGroups()
    .subscribe(data => {
     this.groupList= data.data;
   }, error => {
      console.log(error);
    });
   }


   editGroup(userEdit:GroupDTO){
    this.group=userEdit;

    this.groupForm= this.fb.group({
      name:new FormControl(userEdit.groupName,Validators.required)
    
    }
    );
  }

  get w() { return this.groupForm.controls; }

  updateGroup(){
    this.submitted = true;
    if (this.groupForm.invalid) {
      return false;
      }

    this.group.groupName = this.groupForm.get('name').value;
    

    this.userService.updateGroup( this.group)
    .subscribe(data => {
      $("#userModal").modal("hide");
      this.loadUsers();
    }, error => {
      console.log(error);
    });

  }


  createGroup(){

    this.submitted = true;
    if (this.groupForm.invalid) {
      return false;
      }
      this.group.groupName = this.groupForm.get('name').value;


    this.userService.createGroup(this.group)
    .subscribe(data => {
      $("#userCreateModal").modal("hide");
      this.loadUsers();
    }, error => {
      console.log(error);
    });

  }


}
