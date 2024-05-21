import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { PosteService } from '../../poste/posteService/poste.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../userService/user.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-edit-proc',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  inputdata: any;
  editdata: any;
  closemessage = 'closed using directive'
  myform!:FormGroup;
  posteOptions: any;
selectedCategory: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<EditUserComponent >, private Formbuilder: FormBuilder,
  private userService: UserService,private snackBar: MatSnackBar,private posteService:PosteService) { }

  ngOnInit(): void {
    this.inputdata = this.data;
    this.selectedCategory = this.data.posteId;
    this.initializeForm();
  }
  initializeForm() {
    this.myform = this.Formbuilder.group({
      firstName: [this.data.firstName, Validators.required],
      lastName: [this.data.lastName, [Validators.required]],
      telephone: [this.data.telephone, [ Validators.pattern("^[0-9]+$")] ],
      posteId: [this.data.posteId, Validators.required]
});
  }
  closeDialog(): void {
    this.ref.close({ event: 'Cancel' });
  }

    Cancel() {
      this.ref.close();
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
      const formData=  this.myform.value;
      console.log(formData);
      this.userService.updateUser(this.data.code,formData).pipe(
        catchError(err => {
         if(err.status===400){
          this.snackBar.open('fail edit', '', {
            duration: 3000,
            panelClass: ['panelErrorClass']
          });}
          return throwError(err);
        })
      ).subscribe((result: any) => {
        if (result) {
          this.snackBar.open('User edited successfully', '', {
            duration: 3000,
            panelClass: ['panelClass']
          });
          this.Cancel();
        }

      });
    }

}
}
