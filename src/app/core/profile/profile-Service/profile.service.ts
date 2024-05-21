import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  apiURL = environment.apiUrl;
  baseUri = this.apiURL+'/profile';
  constructor(private http:HttpClient) { }

  changePassword(data: any): Observable <any> {
    let url = `${this.baseUri}`+"/changePassword";
 return this.http.put(url,data,{ observe: 'response'});
}
getProfileDetails(){

  return this.http.get(`${this.baseUri}`);
}
updateProfile(data:any): Observable<any> {

  let url = `${this.baseUri}/putProfile`;
 console.log(data)
  return this.http.put(url, data,{ observe: 'response'});

}

}
