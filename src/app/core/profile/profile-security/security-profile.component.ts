
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ProfileService } from '../profile-Service/profile.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './security-profile.component.html',
  styleUrls: ['./security-profile.component.scss']
})
export class SecurityProfileComponent implements OnInit {
  eyeIcon = 'visibility'; // Initial icon for password field
  eyeIconConfirmation = 'visibility'; // Initial icon for confirmation password field
  hide = true; // Flag to control password visibility
  hideConfirmation = true; //
  myform!: FormGroup;
  objPassword:any;
  constructor(private formBuilder: FormBuilder,private security:ProfileService,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.togglePasswordVisibility();
    this.togglePasswordVisibilityconfirmation();
    this.myform = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required] // Validators for confirmPassword control
    }, {
      validators: this.confirmPasswordValidator.bind(this) // Binding confirmPasswordValidator to the component instance
    });
  }

  togglePasswordVisibility() {
    this.hide = !this.hide;
    this.eyeIcon = this.hide ? 'visibility' : 'visibility_off';
  }

  togglePasswordVisibilityconfirmation() {
    this.hideConfirmation = !this.hideConfirmation;
    this.eyeIconConfirmation = this.hideConfirmation ? 'visibility' : 'visibility_off';
  }

  confirmPasswordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const newPassword = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (newPassword !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ 'passwordsDoNotMatch': true }); // Set error if passwords do not match
      return { 'passwordsDoNotMatch': true };
    } else {
      return null;
    }
  }
  updatePassword() {
    console.log("data", this.myform.value);
    if (this.myform.valid) {
      this.objPassword={
        oldPassword:this.myform.value.oldPassword,
        newPassword:this.myform.value.newPassword

      }
      console.log(this.objPassword);
      this.security.changePassword(this.objPassword).pipe(
        catchError(err => {
         if(err.status===400){
          console.log("msg",err);
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

        }

      });
    }
  }
    }

