
import { environment } from 'src/environments/environment';
import {ApiResourceInterface} from '../../../models/api-resource.interface';
import { MatTableDataSource } from '@angular/material/table';


export class Department implements ApiResourceInterface {
  constructor(
    public Department: string,
    public Administrator: string,
    public Employees_Number: string,
   ) {
  }
    getSubResourceUri() {
        throw new Error('Method not implemented.');
    }


    


  // tslint:disable-next-line:typedef

  getCollectionUri() {

   return `${environment.apiUrl}/department/`;

  }

  getItemUri() {

   return `${environment.apiUrl}/department/`;

   }

}
