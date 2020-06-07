import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './components/structure/admin-layout/admin-layout.component';

const appRoutes: Routes = [
  {path: '', component: AdminLayoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
