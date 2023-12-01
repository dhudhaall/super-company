import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { provideStore } from '@ngrx/store';
import { metaReducers, reducers } from './reducers';
import { provideEffects } from '@ngrx/effects';
import { SunriseEffects } from './dashboard/home/effects/home.effects';
import { sunriseReducer } from './reducers/home.reducer';

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
