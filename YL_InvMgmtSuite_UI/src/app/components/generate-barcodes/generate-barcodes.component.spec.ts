import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateBarcodesComponent } from './generate-barcodes.component';

describe('GenerateBarcodesComponent', () => {
  let component: GenerateBarcodesComponent;
  let fixture: ComponentFixture<GenerateBarcodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateBarcodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateBarcodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
