import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
const materialComponents = [
  MatIconModule,
  MatMenuModule,
  MatFormFieldModule,
  MatInputModule,
  MatGridListModule,
  MatCardModule
];

@NgModule({
  imports: [materialComponents],
  exports: [materialComponents]
})
export class MaterialModule { }
