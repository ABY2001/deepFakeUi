import { Routes } from '@angular/router';
import { MainLayout } from './main-layout/main-layout';
import { DashboardComponent } from './dashboard/dashboard.component';

// export const routes: Routes = [
//     {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
//     { path: 'dashboard', component: DashboardComponent }
// ];

export const routes: Routes = [
    {path: '',
    component: MainLayout,
    children:[
       {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
       {path: 'dashboard', component: DashboardComponent },
       
    ] }
];
