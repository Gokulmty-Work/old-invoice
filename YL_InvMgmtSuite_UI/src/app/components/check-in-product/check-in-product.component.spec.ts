import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInProductComponent } from './check-in-product.component';

describe('CheckInProductComponent', () => {
  let component: CheckInProductComponent;
  let fixture: ComponentFixture<CheckInProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckInProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckInProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
