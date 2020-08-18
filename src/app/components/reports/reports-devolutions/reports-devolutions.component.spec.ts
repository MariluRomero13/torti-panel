import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsDevolutionsComponent } from './reports-devolutions.component';

describe('ReportsDevolutionsComponent', () => {
  let component: ReportsDevolutionsComponent;
  let fixture: ComponentFixture<ReportsDevolutionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsDevolutionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsDevolutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
