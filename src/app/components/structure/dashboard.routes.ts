import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

export const dashboardRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }
  // { path: 'perfil/:id', component: ProfileComponent, canActivate: [AuthGuard] },
];
