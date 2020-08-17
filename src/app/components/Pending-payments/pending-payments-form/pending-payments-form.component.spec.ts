import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingPaymentsFormComponent } from './pending-payments-form.component';

describe('PendingPaymentsFormComponent', () => {
  let component: PendingPaymentsFormComponent;
  let fixture: ComponentFixture<PendingPaymentsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingPaymentsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingPaymentsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
