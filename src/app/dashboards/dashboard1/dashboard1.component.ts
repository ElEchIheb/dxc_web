import { Component } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard1.component.html',
    styleUrls: ['./dashboard1.component.scss']
})
export class Dashboard1Component {
  currentDateTime: Date = new Date();

  constructor() {
    setInterval(() => {
      this.currentDateTime = new Date();
    }, 1000);}
}
