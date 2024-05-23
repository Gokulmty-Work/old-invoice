import { TestBed } from '@angular/core/testing';

import { AppParameterService } from './app-parameter.service';

describe('AppParameterService', () => {
  let service: AppParameterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppParameterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
