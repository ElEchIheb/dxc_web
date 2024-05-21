
import { environment } from 'src/environments/environment';
import {ApiResourceInterface} from '../../../models/api-resource.interface';

export class user implements ApiResourceInterface {
  constructor(
    public process: string,
    public name: string,
      public content: string,
     public ref: string,
    public campany: string,
    public type: string,
    public filename: string,

   ) {
  }
    getSubResourceUri() {
        throw new Error('Method not implemented.');
    }





  // tslint:disable-next-line:typedef

  getCollectionUri() {

   return `${environment.apiUrl}/tools/`;

  }

  getItemUri() {

   return `${environment.apiUrl}/tools/`;

   }

}
