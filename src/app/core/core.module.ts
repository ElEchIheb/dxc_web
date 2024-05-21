import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CoreRoutingModule } from './core-routing.module';
 import { SharedModule } from '../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
 import { PosteComponent } from './poste/postes-liste/poste.component';
 import {MatIconModule} from '@angular/material/icon';
import { EditPosteComponent } from './poste/edit-poste/edit-poste.component';
import { AddPosteComponent } from './poste/add-poste/add-poste.component'
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AddCampagneComponent } from './campagne/add-campagne/add-campagne.component';
import { CampagneComponent } from './campagne/campagne-liste/campagne.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import { UserComponent } from './user/user-liste/user.component';
import { DeparmentComponent } from './Department/Liste-Department/Department.component';
import { AddDeparmentComponent } from './Department/add-Department/add-Department.component';
import { EditDeparmentComponent } from './Department/edit-Department/edit-Department.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { DataService } from '../services/data.service';
import {MatCardModule} from '@angular/material/card';
import{Ng2SearchPipeModule} from 'ng2-search-filter';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CustomCalendarHeaderComponentComponent } from './campagne/add-campagne/CustomCalendarHeaderComponent/custom-calendar-header-component/custom-calendar-header-component.component';
import { TeamListeComponent } from './team/team-liste/team-liste.component';
import { AddTeamComponent } from './team/add-team/add-team.component';
import { EditTeamComponent } from './team/edit-team/edit-team.component';
import { ProfileDetailsComponent } from './profile/profile-details/profile-details.component';
import { SecurityProfileComponent } from './profile/profile-security/security-profile.component';






   @NgModule({
  declarations: [
    PosteComponent,
    EditPosteComponent,
    AddPosteComponent,
    AddUserComponent,
    UserComponent,
    EditUserComponent,
    CampagneComponent,
    DeparmentComponent,
    AddDeparmentComponent,
    EditDeparmentComponent,
    AddCampagneComponent,
    CustomCalendarHeaderComponentComponent,
    TeamListeComponent,
    AddTeamComponent,
    EditTeamComponent,
    ProfileDetailsComponent,
    SecurityProfileComponent,

  ],
  imports: [RouterModule,
    SharedModule,MatPaginatorModule,
    MatTableModule,Ng2SearchPipeModule,
    CommonModule,
    CoreRoutingModule,
    FlexLayoutModule,MatDialogModule,MatCardModule,
    DemoMaterialModule,ReactiveFormsModule,FormsModule,
    NgxDatatableModule ,MatSortModule,MatFormFieldModule,MatIconModule, MatInputModule,
    MatAutocompleteModule,MatSnackBarModule,

   ],
   providers: [DataService]

})
export class CoreModule { }
