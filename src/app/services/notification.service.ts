import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
@Injectable({ providedIn: 'root' })
export class NotificationService {
  config: MatSnackBarConfig = {
    duration: 2000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
    panelClass: ['green-snackbar']
  };

  constructor(public snackBar: MatSnackBar) {}
  success(message:any) {
    this.snackBar.open(message, 'x', this.config);
    
  }


  error(message:any) {
    this.config.panelClass = ['notification', 'error'];
    this.snackBar.open(message, 'x', this.config);
    this.config.panelClass = ['background-green'];

  }

}
