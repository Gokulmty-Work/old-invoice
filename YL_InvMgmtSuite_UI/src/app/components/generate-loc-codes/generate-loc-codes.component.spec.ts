import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateLocCodesComponent } from './generate-loc-codes.component';

describe('GenerateLocCodesComponent', () => {
  let component: GenerateLocCodesComponent;
  let fixture: ComponentFixture<GenerateLocCodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateLocCodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateLocCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
