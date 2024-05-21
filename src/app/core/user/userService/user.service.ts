import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiURL = environment.apiUrl;
  baseUri = this.apiURL+'/user';
   headers = new HttpHeaders().set('Content-Type', 'application/json');
    optionRequete = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
      'mon-entete-personnalise':'maValeur',
      'Content-Type': 'application/json',
      ' Access-Control-Allow-Methods':''
     })
  };

  constructor(private http:HttpClient) { }
 // Get all tool
 getTeamByRole(){
  return this.http.get(`${this.apiURL}/team/activeTeams`);
}

  getAllUsers() {

    return this.http.get(`${this.baseUri}`);
  }
  getuserSearch(data:any)
  {

console.log("data",data)
    return this.http.get(`${this.baseUri}/search-user`,data);
  }

  actionUser(id:any,status:boolean): Observable<any> {

    let url = `${this.baseUri}/delUser/${id}`;

    return this.http.put(url,{status});
  }


  createUser(data: any): Observable <any> {


    console.log(data)
    let url = `${this.baseUri}/createUser`;
     return this.http.post(url,data);
  }


  updateUser(id:any,data:any): Observable<any> {

    let url = `${this.baseUri}/putUser/${id}`;
   console.log(data)
    return this.http.put(url, data,{ observe: 'response'});

  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {

      errorMessage = error.error.message;
    } else {

      errorMessage = 'Error Code: ${error.status}\nMessage: ${error.message}';
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

    getUsersdepartment(departmentid:any): Observable<any> {

      let url = `${this.baseUri}/user/${departmentid}`;
      return this.http.get(url).pipe(map((res: any) => {

          return res || {};
        }),
        catchError(this.errorMgmt)
      );

    }
}

