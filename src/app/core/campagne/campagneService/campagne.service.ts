import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CampagneService {
  apiURL = environment.apiUrl;
  baseUri = this.apiURL+'/campagne';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
    optionRequete = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin':'*',
      'mon-entete-personnalise':'maValeur',
      'Content-Type': 'application/json',
      ' Access-Control-Allow-Methods':'GET,POST,OPTIONS,DELETE,PUT'
     })
  };

  constructor(private http:HttpClient) { }

createCampagne(data: any): Observable <any> {
        let url = `${this.baseUri}`+"/createcampagne";
     return this.http.post(url,{"year":data},{ observe: 'response'});
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

 // Get user
   getAllCampagnes() {
    return this.http.get(`${this.baseUri}`);
  }

    // delete   user
    ActivetOrDisactivetCampagne(id:any,status:boolean): Observable<any> {
      let url = `${this.baseUri}/delCampagne/${id}`;
      return this.http.put(url,{status});
    }

    // Get employee
    getCampagne(id:any): Observable<any> {
      let url = `${this.baseUri}/${id}`;
      return this.http.get(url, { headers: this.headers }).pipe(map((res) => {

          return res || {};
        }),
        catchError(this.errorMgmt)
      );

    }

      // Update tool
  updateCampagne(id:any, data:any): Observable<any> {
    let url = `${this.baseUri}/${id}`;
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

}
