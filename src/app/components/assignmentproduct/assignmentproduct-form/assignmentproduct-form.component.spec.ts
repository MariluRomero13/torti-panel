import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentproductFormComponent } from './assignmentproduct-form.component';

describe('AssignmentproductFormComponent', () => {
  let component: AssignmentproductFormComponent;
  let fixture: ComponentFixture<AssignmentproductFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentproductFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentproductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
