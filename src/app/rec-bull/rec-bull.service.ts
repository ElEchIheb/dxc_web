import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecBullService {
  apiURL = environment.apiUrl; // Assurez-vous que votre environnement a une propriété apiURL

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer les bulletins de soins
  getBulletins() {
    return this.http.get<any[]>(`${this.apiURL}/bulletin/bulletins`);
  }

}
