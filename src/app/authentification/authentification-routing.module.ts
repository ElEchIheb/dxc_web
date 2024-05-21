import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
  import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
        title: 'Chartis',
        urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Chartis' }
        ]
    }
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthentificationRoutingModule {}
