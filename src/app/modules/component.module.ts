import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../components/structure/sidebar/sidebar.component';
import { AdminLayoutComponent } from '../components/structure/admin-layout/admin-layout.component';
import { NavbarComponent } from '../components/structure/navbar/navbar.component';
import { ShareModule } from './share.module';
import { LoginComponent } from '../components/auth/login/login.component';
import { RecoveryPasswordComponent } from '../components/auth/recovery-password/recovery-password.component';


@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    AdminLayoutComponent,
    LoginComponent,
    RecoveryPasswordComponent
  ],
  imports: [
    CommonModule,
    ShareModule
  ],
  exports: [
    ShareModule
  ]
})
export class ComponentModule { }
