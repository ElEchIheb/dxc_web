import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { PosteService } from '../../poste/posteService/poste.service';
import { DatePipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../userService/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DepartmentService } from '../../Department/DepartmentService/department.service';
import { numericValidator } from '../../poste/add-poste/form-validation';
import { TokenService } from 'src/app/authentification/AuthServices/token.service';


@Component({
  selector: 'app-add-proc',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  inputdata: any;
  editdata: any;
  closemessage = 'closed using directive'
  departmentOptions: { value: number, label: string }[] = [];
  posteOptions: { value: number, label: string }[] = [];
  selectedCategory: any;
  local_data: any;
  action: any;
  joiningDate: any;
  datePipe: any;
  teamOptions: { value: number, label: string }[] = [];
userImage: any;
listRole=[{id:3,roleName:"manager"},{id:4,roleName:"collaborator"}];
isShowRoleAndTeam:boolean=true
isshowDepartment:boolean=true
selectedDepartment="select department";
selectedPoste= "Select Post" ;
isShow:boolean = false
  isupShow: boolean= true
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<AddUserComponent >, private buildr: FormBuilder,
    private userService: UserService,private snackBar: MatSnackBar,private departmentService :DepartmentService,private posteService:PosteService,private localStorageRole:TokenService) {
      this.local_data = { ...data };
        this.action = this.local_data.action;
        if (this.local_data.DateOfJoining !== undefined) {
          this.joiningDate = this.datePipe.transform(new Date(this.local_data.DateOfJoining), 'yyyy-MM-dd');
      }
        if (this.local_data.imagePath === undefined) {
            this.local_data.imagePath = 'assets/img/user.jpg';
        }
  }
  ngOnInit(): void {


    this.fetchDepartmentOptions();
    this.fetchPosteOptions();
    this.showDepartment()

  }
  showDepartment():void{
    if(this.localStorageRole.getRole()=='admin'){
      this.isshowDepartment=false
      this.isShowRoleAndTeam=true

    }else{
      this.isshowDepartment=true
      this.isShowRoleAndTeam=false
    }

  }
  myform = this.buildr.group({
    file: [null],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    telephone: [null, [Validators.minLength(8), numericValidator()]],
    departmentId: [null],
    posteId:[null, Validators.required],
    password: [null, Validators.compose([Validators.minLength(10), Validators.required])],
    gender:['', Validators.required],
    roleId:[null],
    teamId:['']
  });
  getTeamsByRole(roleId:any){
    if(roleId==3){
      this.userService.getTeamByRole().subscribe(
        (data: any) => {
          this.teamOptions = data.listTeamsWithoutManager.map((item: { id: Number; teamName: String; }) => ({ value: item.id, label: item.teamName }));;
        },
        (error) => {
          console.error('Error fetching options:', error);
        }
      );
    }else if(roleId==4){
      this.userService.getTeamByRole().subscribe(
        (data: any) => {
          this.teamOptions = data.listTeamsWithManager.map((item: { id: Number; teamName: String; }) => ({ value: item.id, label: item.teamName }));;
        },
        (error) => {
          console.error('Error fetching options:', error);
        }
      );
    }
    }
  selectFile(event: any): void {
    const fileInput = event.target as HTMLInputElement;
    if (!fileInput.files || fileInput.files.length === 0) {
        // No file selected
        return;
    }

    const file = fileInput.files[0];
    const mimeType = file.type;
    if (!mimeType || !mimeType.match(/image\/*/)) {
        // File is not an image
        return;
    }
    this.userImage = file;
    // Read the selected file as a data URL if you need to display preview
    const reader = new FileReader();
    reader.onload = () => {
        // Set the data URL as the image path if you want to display preview
        this.local_data.imagePath = reader.result;
    };
    reader.readAsDataURL(file);
}

doAction(): void {
  this.ref.close({ event: this.action, data: this.local_data });
}
closeDialog(): void {
  this.ref.close({ event: 'Cancel' });
}

  Cancel() {
    this.ref.close();
  }


  fetchDepartmentOptions() {
   this.departmentService.getAllDempartments().subscribe(
      (data: any) => {
        this.departmentOptions = data.map((item: { departmentId: Number; departmentName: String; }) => ({ value: item.departmentId, label: item.departmentName }));;
      },
      (error) => {
        console.error('Error fetching options:', error);
      }
    );
  }
  randomPassword() {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    const string_length = 15;
    let randomstring = '';
    for (var i=0; i<string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum,rnum+1);
    }

    const passwordControl = this.myform.get('password');
    if (passwordControl) {
        passwordControl.setValue(randomstring);
    }
}

  fetchPosteOptions() {
    this.posteService.getAllpostes().subscribe(
       (data: any) => {
        console.log("data :",data);
         this.posteOptions= data.map((item: { id: Number; posteName: String; }) => ({ value: item.id, label: item.posteName }));;
       },
       (error) => {
         console.error('Error fetching options:', error);
       }
     );
   }
  SaveUser() {
    if (this.myform.valid) {
      const formData = new FormData();

      // Perform null checks before accessing form controls

      const firstNameControl = this.myform.get('firstName');
      const lastNameControl = this.myform.get('lastName');
      const genderControl = this.myform.get('gender');
      const telephoneControl = this.myform.get('telephone');
      const emailControl = this.myform.get('email');
      const passwordControl = this.myform.get('password');
      const posteIdControl = this.myform.get('posteId');
      const departmentIdControl = this.myform.get('departmentId');
      const teamIdControl = this.myform.get('teamId');
      const roleIdControl = this.myform.get('roleId');
      // Append form field values only if controls are not null
      if ( firstNameControl && lastNameControl && genderControl && telephoneControl && emailControl && passwordControl && posteIdControl && departmentIdControl && roleIdControl  && teamIdControl) {
        formData.append('file', this.userImage);
        formData.append('firstName', firstNameControl.value);
        formData.append('lastName', lastNameControl.value);
        formData.append('gender', genderControl.value);
        formData.append('telephone', telephoneControl.value);
        formData.append('email', emailControl.value);
        formData.append('password', passwordControl.value);
        formData.append('posteId', posteIdControl.value);
        if(this.localStorageRole.getRole()=='superadmin'){
          formData.append('departmentId', departmentIdControl.value);
          }
          if(this.localStorageRole.getRole()=='admin'){
            formData.append('teamId', teamIdControl.value);
            formData.append('roleId', roleIdControl.value);
          }
        this.userService.createUser(formData).pipe(
        catchError(err => {
         if(err.status===400){
          this.snackBar.open('User already exists', '', {
            duration: 3000,
            panelClass: ['panelErrorClass']
          });}
          return throwError(err);
        })
      ).subscribe((result: any) => {
        if (result) {
          this.snackBar.open('Poste created successfully', '', {
            duration: 3000,
            panelClass: ['panelClass']
          });
          this.Cancel();
        }

      });
    }
  }
}
}
