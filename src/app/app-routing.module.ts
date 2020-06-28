import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './components/structure/admin-layout/admin-layout.component';
import { LoginComponent } from './components/auth/login/login.component';
const appRoutes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: '', component: AdminLayoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
