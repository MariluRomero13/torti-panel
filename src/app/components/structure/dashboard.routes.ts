import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ProfileComponent } from './../auth/profile/profile.component';
import { NotificationIndexComponent } from './../notifications/notification-index/notification-index.component';
import { EmployeeIndexComponent } from './../employees/employee-index/employee-index.component';
import { EmployeeFormComponent } from './../employees/employee-form/employee-form.component';
import { ProductIndexComponent } from './../products/product-index/product-index.component';
import { AssignCustomerIndexComponent } from './../assign-customers/assign-customer-index/assign-customer-index.component';
import { CustomersIndexComponent } from '../customers/customers-index/customers-index.component';
import { StockIndexComponent } from '../stocks/stock-index/stock-index.component';
import { DeliveriesIndexComponent } from './../deliveries/deliveries-index/deliveries-index.component';
import { SaleIndexComponent } from './../Sales/sale-index/sale-index.component';
import { PendingPaymentsIndexComponent } from './../Pending-payments/pending-payments-index/pending-payments-index.component';
import { DevolutionIndexComponent } from './../devolutions/devolution-index/devolution-index.component';
import { AssignmentproductIndexComponent } from './../assignmentproduct/assignmentproduct-index/assignmentproduct-index.component';

export const dashboardRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent }, // Add AuthGuard
  { path: 'perfil', component: ProfileComponent },
  { path: 'notificaciones', component: NotificationIndexComponent },
  { path: 'empleados', component: EmployeeIndexComponent },
  { path: 'agregar-empleado', component: EmployeeFormComponent },
  { path: 'editar-empleado/:id', component: EmployeeFormComponent },
  { path: 'productos', component: ProductIndexComponent },
  { path: 'asignar-clientes', component: AssignCustomerIndexComponent },
  { path: 'clientes', component: CustomersIndexComponent },
  { path: 'inventario', component: StockIndexComponent }, 
  { path: 'entregas', component: DeliveriesIndexComponent },
  { path: 'ventas', component: SaleIndexComponent },
  { path: 'pagos-pendientes', component: PendingPaymentsIndexComponent },
  { path: 'devoluciones', component: DevolutionIndexComponent },
  { path: 'asignar-productos', component: AssignmentproductIndexComponent },
];
