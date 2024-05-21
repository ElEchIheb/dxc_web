import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

const AUTH_API = environment.apiUrl+'/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  tokenService: any;

  constructor(private http: HttpClient,private token:TokenService, private router: Router) {}
  login(data:any): Observable<any> {
    return this.http.post(AUTH_API + 'login',{
      data
    }, httpOptions);

  }


  logout(): void {
    this.token.deleteAccessToken();
    this.token.deleteRefreshToken();
    this.token.deleteRole();

    this.router.navigate(['/auth/login']);
  }

 isLoggedIn(): boolean {
    return this.token.getAccessToken() !== null;
  }
  Forgotpassword(email: string): Observable<any> {
    return this.http.post(AUTH_API + 'forgetpassword', {
      email
    }, httpOptions);

  }

}

