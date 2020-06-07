import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const appModules = [
  CommonModule,
  RouterModule,
  MaterialModule,
  ReactiveFormsModule,
  FormsModule,
  MaterialModule
];

@NgModule({
  imports: [appModules],
  exports: [appModules]
})
export class ShareModule { }
