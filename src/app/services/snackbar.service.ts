import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor() { }

  show(message: string, duration: number = 5000, colorResponse: string) {
    const snackbar = document.createElement('div');
    snackbar.textContent = message;
    snackbar.style.position = 'fixed';
    snackbar.style.bottom = '20px';
    snackbar.style.left = '50%';
    snackbar.style.transform = 'translateX(-50%)';
    snackbar.style.backgroundColor = colorResponse; // Corrected the parameter type to 'string'
    snackbar.style.color = 'white';
    snackbar.style.padding = '16px';
    snackbar.style.borderRadius = '4px';
    snackbar.style.zIndex = '1000';

    document.body.appendChild(snackbar);

    setTimeout(() => {
      document.body.removeChild(snackbar);
    }, duration);
  }
}
