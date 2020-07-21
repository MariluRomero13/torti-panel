import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentModule } from './modules/component.module';
import { ShareModule } from './modules/share.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { JwtInterceptorService } from './services/authentication/jwt-interceptor.service';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getSpainPaginatorIntl } from './functions/paginator';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
  BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentModule,
    ShareModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    },
    { provide: MatPaginatorIntl, useValue: getSpainPaginatorIntl() }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
