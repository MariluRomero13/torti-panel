import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { CustomerFormComponent } from './customer-form.component';
import { ShareModule } from 'src/app/modules/share.module';



@NgModule({
  declarations: [CustomerFormComponent],
  imports: [
    CommonModule,
    ShareModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyADs2y9qH2F6an_vwaz0lsy__XBRfN_jQw'
    })
  ]
})
export class CustomerModule { }
