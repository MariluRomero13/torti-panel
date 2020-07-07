import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ProfileComponent } from './../auth/profile/profile.component';
import { NotificationIndexComponent } from './../notifications/notification-index/notification-index.component';
import { EmployeeIndexComponent } from './../employees/employee-index/employee-index.component';
import { EmployeeFormComponent } from './../employees/employee-form/employee-form.component';
import { ProductIndexComponent } from './../products/product-index/product-index.component';

export const dashboardRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent }, // Add AuthGuard
  { path: 'perfil', component: ProfileComponent },
  { path: 'notificaciones', component: NotificationIndexComponent },
  { path: 'empleados', component: EmployeeIndexComponent },
  { path: 'agregar-empleado', component: EmployeeFormComponent },
  { path: 'editar-empleado/:id', component: EmployeeFormComponent },
  { path: 'productos', component: ProductIndexComponent }
];
