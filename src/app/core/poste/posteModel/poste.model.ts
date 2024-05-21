
import { environment } from 'src/environments/environment';
import {ApiResourceInterface} from '../../../models/api-resource.interface';


export class Poste{
  posteName: string;
  sickLeave: string;
  leave: number;
  status: number;

  constructor(posteName: string, sickLeave: string, leave: number, status: number) {
    this.posteName = posteName;
    this.sickLeave = sickLeave;
    this.leave = leave;
    this.status = status;
  }
}
