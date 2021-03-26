import { TestBed } from '@angular/core/testing';

import { TurbinelistService } from './turbinelist.service';

describe('TurbinelistService', () => {
  let service: TurbinelistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TurbinelistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
