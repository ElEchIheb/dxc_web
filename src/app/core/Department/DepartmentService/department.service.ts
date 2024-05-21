import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class DepartmentService {

  apiURL = environment.apiUrl;
  baseUri = this.apiURL+'/department';
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
 getDempartSearch(departmentName?: String) {
  let params = new HttpParams();


  let url = `${this.baseUri}/search-department/${departmentName}`;
  return this.http.get(url,{ headers:this.headers });
}


  getAllDempartments() {
    
    return this.http.get(`${this.baseUri}`, { headers :this.headers });
  }


  actionDempartment(id:any,status:boolean): Observable<any> {

    let url = `${this.baseUri}/delDept/${id}`;

    return this.http.put(url,{status});
  }


  createDempartment(data: any): Observable <any> {


    const body=JSON.stringify(data);
    let url = `${this.baseUri}/createDepartment`;
     return this.http.post(url,body,{ headers:this.headers  });
  }


  updateDempartment(id:any,departmentName:any): Observable<any> {

    let url = `${this.baseUri}/putDept/${id}`;
    return this.http
      .put(url, {departmentName}, { headers:this.headers })
      .pipe(catchError(this.errorMgmt));
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

    getDempartment(departmentName:any): Observable<any> {

      let url = `${this.baseUri}/search-department/${departmentName}`;
      return this.http.get(url, {headers : this.headers}).pipe(map((res: any) => {

          return res || {};
        }),
        catchError(this.errorMgmt)
      );

    }
}

