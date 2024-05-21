import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NotificationService } from 'src/app/services/notification.service';
import { DepartmentService } from '../DepartmentService/department.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../user/userService/user.service';
@Component({
  selector: 'app-add-indicator',
  templateUrl: './add-Department.component.html',
  styleUrls: ['./add-Department.component.scss']
})
export class AddDeparmentComponent implements OnInit {
  selectedCategory = 'All';
  inputdata: any;
  editdata: any;
  AddDepartmentForm!: FormGroup;
  closemessage = 'closed using directive'
options: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<AddDeparmentComponent>, private buildr: FormBuilder,
    private departmentservice: DepartmentService,private snackBar: MatSnackBar,private userService:UserService) {

  }
  ngOnInit(): void {
    this.inputdata = this.data;


  }



  Cancel() {
    this.ref.close('Closed using function');
  }

  myform = this.buildr.group({
    departmentName: [null, Validators.compose([Validators.required])],
  });
  

  Savedeparment() {
    this.departmentservice.createDempartment(this.myform.value).subscribe(res => {
      const message = ` department added successfully`;
      this.snackBar.open(message, '', {
        duration: 3000,
        panelClass: ['panelClass']
      });
      this.Cancel();
    });
  }}

