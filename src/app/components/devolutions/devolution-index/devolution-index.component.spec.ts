import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolutionIndexComponent } from './devolution-index.component';

describe('DevolutionIndexComponent', () => {
  let component: DevolutionIndexComponent;
  let fixture: ComponentFixture<DevolutionIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevolutionIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevolutionIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
