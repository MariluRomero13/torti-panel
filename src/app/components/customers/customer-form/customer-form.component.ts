import { Component, OnInit, Inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ICustomer } from 'src/app/models/customer';
import { customerMessage } from 'src/app/functions/messages';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerService } from 'src/app/services/customer.service';
import { successMessage } from 'src/app/functions/alerts';
@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit, AfterViewInit {
  lat=25.54389;
  lng=-103.41898;

  customerForm: FormGroup;
  customer: ICustomer;
  validationMessages = customerMessage;
  mapa: google.maps.Map;
  marker: google.maps.Marker;

  @ViewChild('mapWrapper', {static: true}) mapElement: ElementRef;
  constructor(public dialogRef: MatDialogRef<CustomerFormComponent>,
              private customerSvc: CustomerService,
              @Inject(MAT_DIALOG_DATA) public data: any) { this.createForm();}

  ngOnInit(): void {
    if(this.data.edit){
      this.show();
    }
  }

  ngAfterViewInit() {
   this.map();
  }

  map () {
    /*
    const LatLng = new google.maps.LatLng(25.54389,-103.41898);
    const mapOptions = {
      center: LatLng,
      zoom: 13,
    }


    this.mapa = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    var marker = new google.maps.Marker({position:{lat: this.lat,lng: this.lng},
                                        draggable:true,
                                        map:this.mapa})

    google.maps.event.addListener(marker,'dragend', function(evt){
      this.lat = evt.latLng.lat().toFixed(6)
      this.lng = evt.latLng.lng().toFixed(6)
      console.log(evt.latLng.lat().toFixed(6),evt.latLng.lng().toFixed(6))

      this.customerForm.get('latitude').setValue(parseFloat(this.lat));
      this.customerForm.get('longitude').setValue(parseFloat(this.lng));
      console.log(this.lat,this.lng)

      //console.log(evt.latLng.lng().toFixed(6),)
      //aqui adentro se deberían escribir en los inputs la lat y la lng del marcador o fuera utilizando
      })
      
      
      
      //this.writeCoords()
      
    //console.log(evt.latLng.lng().toFixed(6))
    */

   this.mapa = new google.maps.Map(this.mapElement.nativeElement, {
    center: {lat: this.lat, lng: this.lng },
    zoom: 13
    });
    
    this.marker = new google.maps.Marker({
    position: {lat: this.lat, lng: this.lng },
    map: this.mapa,
    draggable: true
    
    });
    this.marker.addListener('dragend',(evt) => this.writeCoords(evt));
    }
    
  private writeCoords(evt:any):void{
    this.customerForm.get('latitude').setValue(evt.latLng.lat().toFixed(6));
    this.customerForm.get('longitude').setValue(evt.latLng.lng().toFixed(6));
  }

  private createForm(): void {
    this.customerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      latitude: new FormControl('', Validators.required),
      longitude: new FormControl('', Validators.required)
    });
    this.dialogRef.disableClose = true;
  }

  store(): void {
    this.getCustomerData();
    this.customerSvc.store(this.customer).subscribe(res =>{
      if(res.success){
        successMessage('Cliente registrado correctamente').then(() => this.clear());
      }
    });
  }

  update(): void {
    this.getCustomerData();
    this.customerSvc.update(this.customer).subscribe(res => {
      if (res.success) {
        successMessage('Cliente actualizado correctamente').then(() => this.clear());
      }
    });
  }

  show(): void {
    this.customerForm.patchValue(this.data.customer);
  }

  private getCustomerData(): void {
    this.customer = {
      ...this.customerForm.value
    };

    if (this.data.edit) {
      this.customer.id = this.data.customer.id;
    }
  }

  private clear(): void {
    this.customerForm.reset();
    this.dialogRef.close();
  }


}
