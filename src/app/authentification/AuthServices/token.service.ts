import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
const AUTH_API = environment.apiUrl+'/auth/';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private http: HttpClient) { }

  storeAccessToken(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  storeRefreshToken(token: string): void {
    localStorage.setItem('refreshToken', token);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  deleteAccessToken(): void {
    localStorage.removeItem('accessToken');
  }

  deleteRefreshToken(): void {
    localStorage.removeItem('refreshToken');
  }
  deleteRole():void{
    localStorage.removeItem('Role');

  }
  storeRole(role: string): void {
    localStorage.setItem('Role', role);
  }
  getRole(): string | null{
    return localStorage.getItem('Role');
  }

  refreshAccessToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    return this.http.post<any>(AUTH_API +'refreshtoken', { refreshToken }).pipe(
      map((response) => {
        this.storeAccessToken(response.accessToken);
        return response.accessToken;
      })
    );
  }
}
