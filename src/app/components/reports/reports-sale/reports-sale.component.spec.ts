import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsSaleComponent } from './reports-sale.component';

describe('ReportsSaleComponent', () => {
  let component: ReportsSaleComponent;
  let fixture: ComponentFixture<ReportsSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
