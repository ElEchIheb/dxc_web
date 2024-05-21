import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { PosteService } from '../posteService/poste.service';
import { numericValidator } from '../add-poste/form-validation';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

 @Component({
  selector: 'app-edit',
  templateUrl: './edit-poste.component.html',
  styleUrls: ['./edit-poste.component.scss']
})
export class EditPosteComponent implements OnInit {
  inputdata: any;
  editdata: any;
  closemessage = 'closed using directive'
  myform!:FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<EditPosteComponent>, private formBuilder: FormBuilder,
    private posteservice: PosteService,private snackBar: MatSnackBar) {

  }
  ngOnInit(): void {
    this.inputdata = this.data;
    this.initializeForm();
  }
  initializeForm() {
    this.myform = this.formBuilder.group({
      posteName: [this.data.posteName, Validators.required],
      leave: [this.data.leave, [Validators.required, numericValidator()]],
      sickLeave: [this.data.sickLeave, [Validators.required, numericValidator()]]

    });
  }

  Cancel() {
    this.ref.close('Closed using function');
  }

  Saveposte() {
    if (this.myform.valid) {
      const formData=  this.myform.value;
      this.posteservice.updateposte(this.data.code,formData).pipe(
        catchError(err => {
         if(err.status===400){
          this.snackBar.open('Poste already exists', '', {
            duration: 3000,
            panelClass: ['panelErrorClass']
          });}
          return throwError(err);
        })
      ).subscribe((result: any) => {
        if (result) {
          this.snackBar.open('Poste edited successfully', '', {
            duration: 3000,
            panelClass: ['panelClass']
          });
          this.Cancel();
        }

      });
    }

}
}
