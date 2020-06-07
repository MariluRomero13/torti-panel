import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../components/structure/sidebar/sidebar.component';
import { AdminLayoutComponent } from '../components/structure/admin-layout/admin-layout.component';
import { NavbarComponent } from '../components/structure/navbar/navbar.component';
import { ShareModule } from './share.module';


@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    AdminLayoutComponent
  ],
  imports: [
    CommonModule,
    ShareModule
  ]
})
export class ComponentModule { }
