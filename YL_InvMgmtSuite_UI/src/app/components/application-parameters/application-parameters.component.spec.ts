import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationParametersComponent } from './application-parameters.component';

describe('ApplicationParametersComponent', () => {
  let component: ApplicationParametersComponent;
  let fixture: ComponentFixture<ApplicationParametersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationParametersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
