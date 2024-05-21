import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { DepartmentService } from '../DepartmentService/department.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../user/userService/user.service';

@Component({
  selector: 'app-edit-indicator',
  templateUrl: './edit-Department.component.html',
  styleUrls: ['./edit-Department.component.scss']
})
export class EditDeparmentComponent implements OnInit {


  inputdata: any;
  editdata: any;
  closemessage = 'closed using directive'
  options: any;
selectedCategory: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<EditDeparmentComponent>, private buildr: FormBuilder,
    private departmentservice: DepartmentService,private snackBar: MatSnackBar,private userService:UserService) {

  }
  ngOnInit(): void {
    this.inputdata = this.data;
    this.selectedCategory=this.inputdata.departmentAdmin;
    this.myform = this.buildr.group({
      departmentName: this.buildr.control(this.inputdata.departmentName, [Validators.required]),
    });
    this.userService.getUsersdepartment(this.inputdata.code).subscribe(
      (data) => {
        this.options = data; // Assuming the response is an array of objects
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );

  }

  setpopupdata(code: any) {
    const departmentName = this.myform.get('departmentName')?.value;
    this.departmentservice.updateDempartment(code,departmentName).subscribe(item => {
      this.editdata = item;
      this.myform.setValue({name:this.editdata.departmentName})
    });
  }

  Cancel() {
    this.ref.close();
  }

  myform = this.buildr.group({
    departmentName: [null, Validators.compose([Validators.required])],
  });

  Savedeparment() {
    const departmentName = this.myform.get('departmentName')?.value;
    this.departmentservice.updateDempartment(this.data.code,departmentName).subscribe(res => {
      const message = ` department edited successfully`;
      this.snackBar.open(message, '', {
        duration: 3000,
        panelClass: ['panelClass']
      });
      this.Cancel();
    });
  }}
