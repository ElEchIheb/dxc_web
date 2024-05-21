import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, Subject, throwError } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { PosteService } from '../posteService/poste.service';
import { numericValidator } from './form-validation';
import { catchError } from 'rxjs/operators';


@Component({
  selector: 'app-add-tools',
  templateUrl: './add-poste.component.html',
  styleUrls: ['./add-poste.component.scss']
})
export class AddPosteComponent implements OnInit {
  inputdata: any;
  editdata: any;
  closemessage = 'closed using directive'
  myform!:FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<AddPosteComponent>, private formBuilder: FormBuilder,
    private posteservice: PosteService,private snackBar: MatSnackBar) {

  }
  ngOnInit(): void {
    this.inputdata = this.data;
    this.initializeForm();
  }
  initializeForm() {
    this.myform = this.formBuilder.group({
      posteName: [null, Validators.required],
      leave: [null, [Validators.required, numericValidator()]],
      sickLeave: [null, [Validators.required, numericValidator()]]

    });
  }

  Cancel() {
    this.ref.close('Closed using function');
  }

  Saveposte() {
    if (this.myform.valid) {
      this.posteservice.createposte(this.myform.value).pipe(
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
