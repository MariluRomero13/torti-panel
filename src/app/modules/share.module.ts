import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxCurrencyModule } from 'ngx-currency';
const appModules = [
  CommonModule,
  RouterModule,
  MaterialModule,
  ReactiveFormsModule,
  FormsModule,
  MaterialModule,
  NgxCurrencyModule
];

@NgModule({
  imports: [appModules],
  exports: [appModules]
})
export class ShareModule { }
