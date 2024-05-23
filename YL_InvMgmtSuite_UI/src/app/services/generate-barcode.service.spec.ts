import { TestBed } from '@angular/core/testing';

import { GenerateBarcodeService } from './generate-barcode.service';

describe('GenerateBarcodeService', () => {
  let service: GenerateBarcodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateBarcodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
