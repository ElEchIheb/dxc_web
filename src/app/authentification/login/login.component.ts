import { Component, OnInit } from '@angular/core';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Router } from '@angular/router';
import { TokenService } from '../AuthServices/token.service';
import { AuthenticationService } from '../AuthServices/authentication.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  rememberMe: boolean = false;
  emailValid: boolean = true;
  passwordValid: boolean = true;
  emailtextvalid: string = '';
  roles: string[] = [];
  isLoggedIn = false;
  isLoginFailed = false;
  showModal: boolean = false;
  resetPasswordEmail: string='';
  errorMessage: string ='';
  loginform!: FormGroup;

  constructor(private snackbarService: SnackbarService, private authService: AuthenticationService,
    private tokenStorage: TokenService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginform = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    if (this.tokenStorage.getAccessToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit() {
    if (this.loginform.valid) {
      this.authService.login(this.loginform.value).subscribe({
        next: (success) => {

          this.tokenStorage.storeAccessToken(success[0].accesstoken);
          this.tokenStorage.storeRefreshToken(success[1].refreshToken);
          this.tokenStorage.storeRole(success[0].role);
          this.router.navigate(['/dashboards']);
        },
        error: (error) => {
          this.snackbarService.show(error.error.msg, 5000, 'red');
        }
      });
    } else {
      this.snackbarService.show('Please fill in all fields correctly.', 5000, 'red');
    }
  }

  getErrorMessageE() {
    const emailControl = this.loginform.get('email');
    return emailControl?.hasError('required') ? 'You must enter a value' :
           emailControl?.hasError('email') ? 'Not a valid email' :
           '';
  }

  getErrorMessageP() {
    const passwordControl = this.loginform.get('password');
    return passwordControl?.hasError('required') ? 'You must enter a value' : '';
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  checkValidEmail(event: string) {
    const value = event;
    const pattern = /^[a-zA-Z0-9._%+-]+@gmail.com$/i;
    this.emailValid = pattern.test(value);
    return this.emailValid;
  }

  confirmToSend() {
    if (this.checkValidEmail(this.resetPasswordEmail)) {
      this.authService.Forgotpassword(this.resetPasswordEmail).subscribe({
        next: (response) => {
          if (response) {
            this.showModal = false;
            this.snackbarService.show('Password sent successfully.', 5000, 'green');
          }
        },
        error: (error) => {
          this.snackbarService.show('An error occurred while sending the password. Please try again.', 5000, 'red');
        }
      });
    }
  }

  reloadPage(): void {
    window.location.reload();
  }
}
