import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'/login',
        pathMatch:'full'
      },
      {
        path:'login',
        component:LoginComponent
      },
      {
        path:'dashboard',
        loadChildren: ()=>import('./dashboard/dashboard.module').then(m=>m.DashboardModule)
      },
];
