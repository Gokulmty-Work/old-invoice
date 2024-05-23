import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayProductReportComponent } from './display-product-report.component';

describe('DisplayProductReportComponent', () => {
  let component: DisplayProductReportComponent;
  let fixture: ComponentFixture<DisplayProductReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayProductReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayProductReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
