import { Injectable } from '@angular/core';
 import { RoleGuard } from '../../core/role-guard';
 import { TokenService } from 'src/app/authentification/AuthServices/token.service';
;
import { RecBullService } from 'src/app/rec-bull/rec-bull.service';

export interface BadgeItem {
  type: string;
  value: string;
}
export interface Saperator {
  name: string;
  type?: string;
}
export interface SubChildren {
  state: string;
  name: string;
  type?: string;
}
export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
  child?: SubChildren[];
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  saperator?: Saperator[];
  children?: ChildrenItems[];
}

const MENUITEMS = [


{
  state: 'dashboard',
  name: 'Tableau de bord',
  type: 'link',
  icon: 'av_timer'
},
  {
   state: 'users',
   name: 'Utilisateurs',
   type: 'link',
   icon: 'person'
 },

{canActivate:[RoleGuard],
  state: 'department',
  name: 'Départements',
  type: 'link',
  icon: 'business'

},
{
  state: 'poste',
  name: 'Postes',
  type: 'link',
  icon: 'content_copy'
  },



  {
    state: 'adm_assur',
    name: 'assurances admin',
    type: 'link',
    icon: 'shield'
  },
  {
    state: '',
    name: 'Derniers Bulletins',
    type: 'sub',
    icon: 'last_page',
    children: [
        { state: '', name: 'dfsgdfg	', type: 'link' },
        { state: '', name: 'iheb', type: 'link' },
        { state: '', name: 'iheb el ech	', type: 'link' },


     ]
},
];
const MENUITEMSAdmin =[
  {
    state: 'dashboards/dashboard1',
    name: 'Tableau de bord',
    type: 'link',
    icon: 'av_timer'
  },

  {
   state: 'users',
   name: 'Utilisateurs',
   type: 'link',
   icon: 'person'
 },
{
  state: 'poste',
  name: 'Postes',
  type: 'link',
  icon: 'content_copy'
  }
  ,
  {
  state: 'team',
  name: 'Equipes',
  type: 'link',
  icon: 'group'
  }
];
const MENUITEMSManager =[
  {
    state: 'dashboards/dashboard1',
    name: 'Tableau de bord',
    type: 'link',
    icon: 'av_timer'
  },
{
  state: 'team',
  name: 'Equipes',
  type: 'link',
  icon: 'group'
  }

];
const MENUITEMSCollaborateur =[
  {
    state: 'dashboards',
    name: 'Dashboards',
    type: 'sub',
    icon: 'av_timer',
    children: [
        { state: 'dashboard1', name: 'Dashboard 1', type: 'link' },
     ]
},


];
@Injectable()
export class MenuItems {
  name:any;
  constructor(private localStorageRole:TokenService){}
  getMenuitem(): Menu[] {
    if(this.localStorageRole.getRole()=='superadmin'){
    return MENUITEMS;
  }else if(this.localStorageRole.getRole()=='admin'){
   this.name="teams"
    return MENUITEMSAdmin;
  }else if(this.localStorageRole.getRole()=='manager'){
    return MENUITEMSManager ;
  }else{
    return MENUITEMSCollaborateur;
  }
  }
}
