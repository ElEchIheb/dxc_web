import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {

  constructor() { }

  initMap() {
    // Here you can initialize the Google Map
    // For simplicity, let's just log a message
    console.log('Google Map initialized');
  }

}
