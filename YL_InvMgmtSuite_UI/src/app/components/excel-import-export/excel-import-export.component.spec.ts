import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelImportExportComponent } from './excel-import-export.component';

describe('ExcelImportExportComponent', () => {
  let component: ExcelImportExportComponent;
  let fixture: ComponentFixture<ExcelImportExportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcelImportExportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelImportExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
