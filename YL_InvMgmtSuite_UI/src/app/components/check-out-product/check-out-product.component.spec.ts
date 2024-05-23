import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOutProductComponent } from './check-out-product.component';

describe('CheckOutProductComponent', () => {
  let component: CheckOutProductComponent;
  let fixture: ComponentFixture<CheckOutProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckOutProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckOutProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
