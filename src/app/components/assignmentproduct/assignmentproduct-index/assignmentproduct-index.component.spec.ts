import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentproductIndexComponent } from './assignmentproduct-index.component';

describe('AssignmentproductIndexComponent', () => {
  let component: AssignmentproductIndexComponent;
  let fixture: ComponentFixture<AssignmentproductIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentproductIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentproductIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
