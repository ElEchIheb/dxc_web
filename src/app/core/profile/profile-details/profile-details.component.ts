import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SecurityProfileComponent } from '../profile-security/security-profile.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { numericValidator } from '../../poste/add-poste/form-validation';
import { ProfileService } from '../profile-Service/profile.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {
  teamMembers: any;
  local_data: any;
  action: any;
  joiningDate: any;
  datePipe: any;
  data: any;
  userImage: any;
  myform!: FormGroup;
  dataSource: any;
  gender:any;
  telephone:any;
  lastName:any;
  apiURL = environment.apiUrl;
  imageUrl:any;
  imageName:any;
  firstName:any;
  compensatoryTimeOffBalance:any;
  sickLeaveBalance:any;
  leaveBalance:any;
  departmentName:any;
  posteName:any;
  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog,private changeDetectorRef: ChangeDetectorRef,private FormBuildr: FormBuilder,private profileService:ProfileService
  ) {

    this.local_data = { ...this.data };
    this.action = this.local_data.action;

    if (this.local_data.DateOfJoining !== undefined) {

      this.joiningDate = this.datePipe.transform(new Date(this.local_data.DateOfJoining), 'yyyy-MM-dd');
    }
    if (this.local_data.imagePath === undefined) {
      this.local_data.imagePath = 'assets/images/users/avatar.png';
    }
  }

  ngOnInit(): void {
    this.profileDetails();
    this.myform = this.FormBuildr.group({
      file: [null],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      telephone: ['', [Validators.minLength(8), numericValidator()]],
      gender:['', Validators.required],
    });
  }
  profileDetails(){
    this.profileService.getProfileDetails().subscribe((data: any) => {
      this.dataSource=data;
      this.imageName=data.imageName;
      if(data.imageName==null){
        this.imageUrl='assets/img/user.jpg'
      }else{
      this.imageUrl=`${this.apiURL}/${this.imageName}`;}
        this.firstName=data.firstName;
        this.lastName=data.lastName;
        this.telephone= data.telephone;
        this.gender=data.gender;
        this.compensatoryTimeOffBalance=data.compensatoryTimeOffBalance;
        this.sickLeaveBalance=data.sickLeaveBalance;
        this.leaveBalance=data.leaveBalance;
        this.departmentName=data.departmentName;
        this.posteName=data.posteName;
        this.myform = this.FormBuildr.group({
          file: [null],
          firstName: [data.firstName, Validators.required],
          lastName: [data.lastName, Validators.required],
          telephone: [data.telephone, [Validators.minLength(8), numericValidator()]],
          gender:[data.gender, Validators.required],
        });
      console.log('team member details : ', data);


    });
  }

  selectFile(event: any): void {
    // Ensure event is defined
    if (!event) {
      console.error('Event is undefined.');
      return;
    }

    // Access the target element differently
    const fileInput = event.currentTarget as HTMLInputElement;

    // Check if files property is null or undefined
    if (!fileInput.files || fileInput.files.length === 0) {
      console.error('No file selected.');
      return;
    }

    const file = fileInput.files[0];
    const mimeType = file.type;
    if (!mimeType || !mimeType.match(/image\/*/)) {
      console.error('Selected file is not an image.');
      return;
    }
    this.local_data = this.local_data || {};
    this.userImage = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl= reader.result as string;
      this.changeDetectorRef.detectChanges();
    };
    reader.readAsDataURL(file);
  }

  updateProfile(){
    console.log(this.userImage)

      const formData = new FormData();

      // Perform null checks before accessing form controls

      const firstNameControl = this.myform.get('firstName');
      const lastNameControl = this.myform.get('lastName');
      const genderControl = this.myform.get('gender');
      const telephoneControl = this.myform.get('telephone');
      console.log("fristname",firstNameControl)

      // Append form field values only if controls are not null
      if ( firstNameControl && lastNameControl && genderControl && telephoneControl) {
        formData.append('file', this.userImage);
        formData.append('firstName', firstNameControl.value);
        formData.append('lastName', lastNameControl.value);
        formData.append('gender', genderControl.value);
        formData.append('telephone', telephoneControl.value);
        formData.forEach((value, key) => {
          console.log("hsdgd",key, value);
      });


        this.profileService.updateProfile(formData).pipe(
        catchError(err => {
         if(err.status===400){
          this.snackBar.open(err.error.msg, '', {
            duration: 3000,
            panelClass: ['panelErrorClass']
          });}
          return throwError(err);
        })
      ).subscribe((result: any) => {
        if (result) {
          this.snackBar.open(result.body.msg, '', {
            duration: 3000,
            panelClass: ['panelClass']
          });
          window.location.reload();
        }

      });
    }


  }

}
