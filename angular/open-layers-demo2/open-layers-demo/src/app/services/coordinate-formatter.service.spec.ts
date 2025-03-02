import { TestBed } from '@angular/core/testing';

import { CoordinateFormatterService } from './coordinate-formatter.service';

describe('CoordinateFormatterService', () => {
  let service: CoordinateFormatterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoordinateFormatterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
