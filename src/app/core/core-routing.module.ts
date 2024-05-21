import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../authentification/AuthServices/auth.guard';
import { AddDeparmentComponent} from './Department/add-Department/add-Department.component';
import { EditDeparmentComponent } from './Department/edit-Department/edit-Department.component';
import { DeparmentComponent } from './Department/Liste-Department/Department.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { UserComponent } from './user/user-liste/user.component';
import { AddPosteComponent } from './poste/add-poste/add-poste.component';
import { EditPosteComponent } from './poste/edit-poste/edit-poste.component';
import { PosteComponent } from './poste/postes-liste/poste.component';
import { AddCampagneComponent } from './campagne/add-campagne/add-campagne.component';
import { CampagneComponent } from './campagne/campagne-liste/campagne.component';
import { TeamListeComponent } from './team/team-liste/team-liste.component';
import { EditTeamComponent } from './team/edit-team/edit-team.component';
import { AddTeamComponent } from './team/add-team/add-team.component';
import { ProfileDetailsComponent } from './profile/profile-details/profile-details.component';
import { SecurityProfileComponent } from './profile/profile-security/security-profile.component';



export const routes: Routes = [
  {
    path: '',
    component: PosteComponent,

  },
  {
    path: 'poste',
    component: PosteComponent,

  },
  {
    path: 'poste/edit-poste/:id',
    component: EditPosteComponent,

  },
  {
    path: 'poste/add-poste',
    component: AddPosteComponent,

  },
  {
    path: 'users',
    component: UserComponent,

  },
  {
    path: 'users/edit/:id',
    component: EditUserComponent,

  },
  {
    path: 'users/add-users',
    component: AddUserComponent,

  },
  {
    path: 'campagne',
    component: CampagneComponent,

  },

  {
    path: 'campagne/add-campagne',
    component: AddCampagneComponent,

  },
  {
    path: 'department',
    component: DeparmentComponent,
  },
  {
    path: 'department/edit/:id',
    component: EditDeparmentComponent,
  },
  {
    path: 'department/add-department',
    component: AddDeparmentComponent,

  },
  {
    path: 'team',
    component: TeamListeComponent,
  },
  {
    path: 'team/edit/:id',
    component: EditTeamComponent,
  },
  {
    path: 'team/add-team',
    component: AddTeamComponent,

  },
  {
    path: 'profile',
    component: ProfileDetailsComponent,
  },
  {
    path: 'security',
    component: SecurityProfileComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule { }
