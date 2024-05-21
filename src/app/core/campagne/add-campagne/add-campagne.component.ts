import { ChangeDetectionStrategy, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of, throwError} from 'rxjs';
import { CampagneService } from '../campagneService/campagne.service';
import { catchError, map, startWith } from 'rxjs/operators';
import * as moment from 'moment';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { CustomCalendarHeaderComponentComponent } from './CustomCalendarHeaderComponent/custom-calendar-header-component/custom-calendar-header-component.component';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-campagne',
  templateUrl: './add-campagne.component.html',
  styleUrls: ['./add-campagne.component.scss']})


export class AddCampagneComponent implements OnInit {
  inputdata: any;
  compagneForm!: FormGroup;
  selectedYearISOFormat: string = moment().toISOString();
  customCalendarHeader = CustomCalendarHeaderComponentComponent;
  selectedYear: number | undefined;

  editdata: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddCampagneComponent>,
    private formBuilder: FormBuilder,
    private campagneService: CampagneService,
    private snackBar: MatSnackBar,private fb:FormBuilder
  ) {
    // Initialize myform with FormBuilder

  }

  ngOnInit(): void {
    this.inputdata = this.data;
    this.compagneForm = this.fb.group({
      date: [null, Validators.compose([Validators.required])],
    });
  }



  _yearSelectedHandler(chosenDate:any, datepicker:any) {
    this.compagneForm.controls['date'].setValue(moment(chosenDate).year());
    datepicker.close();
  }
  cancel(): void {
    this.dialogRef.close({ event: 'Close' });
  }

  saveCampagne() {
    const year = this.compagneForm.get('date')?.value;
    console.log(year);
    this.campagneService.createCampagne(year).pipe(
      catchError(err => {
       if(err.status===400){
        this.snackBar.open('Campaign already exists', '', {
          duration: 3000,
          panelClass: ['panelErrorClass']
        });}
        return throwError(err);
      })
    ).subscribe((result: any) => {
      if (result) {
        this.snackBar.open('Campaign created successfully', '', {
          duration: 3000,
          panelClass: ['panelClass']
        });
        this.cancel();
      }

    });
  }

}
