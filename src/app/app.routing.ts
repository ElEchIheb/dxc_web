import { Routes } from '@angular/router';
import { AuthGuard } from './authentification/AuthServices/auth.guard';
import { AppBlankComponent } from './layouts/blank/blank.component';
import { ModifBullComponent } from './modif-bull/modif-bull.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './Typography/Typography.component';
import { IconsComponent } from './icons/icons.component';

import { FullComponent } from './layouts/full/full.component';
import { AuthenticationService } from './authentification/AuthServices/authentication.service';
import { RecBullComponent } from './rec-bull/rec-bull.component';
import { Dashboard1Component } from './dashboards/dashboard1/dashboard1.component';

export const AppRoutes: Routes = [
    {


        path: '',
        component: FullComponent, canActivate: [AuthGuard],
        children: [
            {
                path: 'forms',
                loadChildren: () => import('./forms/forms.module').then(m => m.FormModule)
            },
            {
                path: 'tables',
                loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule)
            },
            {
                path: '',
                redirectTo: '/dashboards/dashboard1',
                pathMatch: 'full'
            } ,{
                path: 'datatables',
                loadChildren: () => import('./datatables/datatables.module').then(m => m.DataTablesModule)
            },
            {
              path: 'modif',
              component: ModifBullComponent,
            },
            {
              path: 'insurance',
              component: TableListComponent,
            },
            {
              path: 'last_5',
              component: TypographyComponent,
            },
            {
              path: 'adm_assur',
              component: RecBullComponent,
            },
            {path: 'dashboard',
            component : Dashboard1Component,
            },
            {
                path: 'dashboards',
                loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule)
            },
            {
                path: 'material',
                loadChildren: () => import('./material-component/material.module').then(m => m.MaterialComponentsModule)
            } ,
            {
                path: 'multi',
                loadChildren: () => import('./multi-dropdown/multi-dd.module').then(m => m.MultiModule)
            }
        ]
    },
    {
     path: '',
        component: FullComponent,   canActivate: [AuthGuard],
        children: [
            {
                path: 'material',
                loadChildren: () => import('./material-component/material.module').then(m => m.MaterialComponentsModule)
            },
            {
                path: 'starter',
                loadChildren: () => import('./starter/starter.module').then(m => m.StarterModule)
            },
            {
                path: '',
                loadChildren: () => import('./core/core.module').then(m => m.CoreModule)
            }
        ]
    },
    {
        path: 'auth',
        component: AppBlankComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./authentification/authentification.module').then(m => m.AuthentificationModule)
            }
        ]
    }
];
