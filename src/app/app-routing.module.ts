import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './components/structure/admin-layout/admin-layout.component';
import { LoginComponent } from './components/auth/login/login.component';
import { PageNotFoundComponent } from './components/structure/page-not-found/page-not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { dashboardRoutes } from './components/structure/dashboard.routes';
import { AuthLoginGuard } from './guards/auth-login.guard';
const appRoutes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthLoginGuard] }, // Add AuthLoginGuard
  { path: 'panel', redirectTo: '/panel/dashboard', pathMatch: 'full' },
  { path: '', redirectTo: '/panel/dashboard', pathMatch: 'full' },
  { path: 'panel', component: AdminLayoutComponent, children: dashboardRoutes, canActivate: [AuthGuard] }, // Add AuthGuard
  { component: PageNotFoundComponent, path: 'pagina-no-encontrada' },
  { path: '**', redirectTo: 'pagina-no-encontrada' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
