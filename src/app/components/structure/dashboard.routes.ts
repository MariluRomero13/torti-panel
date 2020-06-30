import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ProfileComponent } from './../auth/profile/profile.component';
import { NotificationIndexComponent } from './../notifications/notification-index/notification-index.component';

export const dashboardRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent }, // Add AuthGuard
  { path: 'perfil', component: ProfileComponent },
  { path: 'notificaciones', component: NotificationIndexComponent },
];
