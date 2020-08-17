import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingPaymentsIndexComponent } from './pending-payments-index.component';

describe('PendingPaymentsIndexComponent', () => {
  let component: PendingPaymentsIndexComponent;
  let fixture: ComponentFixture<PendingPaymentsIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingPaymentsIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingPaymentsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
