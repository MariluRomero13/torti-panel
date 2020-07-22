import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../components/structure/sidebar/sidebar.component';
import { AdminLayoutComponent } from '../components/structure/admin-layout/admin-layout.component';
import { NavbarComponent } from '../components/structure/navbar/navbar.component';
import { ShareModule } from './share.module';
import { LoginComponent } from '../components/auth/login/login.component';
import { RecoveryPasswordComponent } from '../components/auth/recovery-password/recovery-password.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { ProfileComponent } from '../components/auth/profile/profile.component';
import { NotificationIndexComponent } from '../components/notifications/notification-index/notification-index.component';
import { NotificationDetailComponent } from '../components/notifications/notification-detail/notification-detail.component';
import { EmployeeIndexComponent } from '../components/employees/employee-index/employee-index.component';
import { EmployeeFormComponent } from '../components/employees/employee-form/employee-form.component';
import { EmployeeDetailsComponent } from '../components/employees/employee-details/employee-details.component';
import { ProductFormComponent } from '../components/products/product-form/product-form.component';
import { ProductIndexComponent } from '../components/products/product-index/product-index.component';
import { DateAgoPipe } from './../pipes/date-ago.pipe';
import { NotificationComponent } from '../components/structure/navbar/notification/notification.component';
import { AssignCustomerIndexComponent } from '../components/assign-customers/assign-customer-index/assign-customer-index.component';
import { AssignCustomerFormComponent } from '../components/assign-customers/assign-customer-form/assign-customer-form.component';
import { AssignCustomerDetailsComponent } from '../components/assign-customers/assign-customer-details/assign-customer-details.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    AdminLayoutComponent,
    LoginComponent,
    RecoveryPasswordComponent,
    DashboardComponent,
    ProfileComponent,
    NotificationIndexComponent,
    NotificationDetailComponent,
    EmployeeIndexComponent,
    EmployeeFormComponent,
    EmployeeDetailsComponent,
    ProductFormComponent,
    ProductIndexComponent,
    DateAgoPipe,
    NotificationComponent,
    AssignCustomerIndexComponent,
    AssignCustomerFormComponent,
    AssignCustomerDetailsComponent
  ],
  imports: [
    CommonModule,
    ShareModule
  ],
  exports: [
    ShareModule
  ],
  entryComponents: [
    RecoveryPasswordComponent,
    NotificationDetailComponent,
    EmployeeDetailsComponent,
    ProductFormComponent
  ]
})
export class ComponentModule { }
