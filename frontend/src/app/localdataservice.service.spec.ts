import { TestBed } from '@angular/core/testing';

import { LocaldataserviceService } from './localdataservice.service';

describe('LocaldataserviceService', () => {
  let service: LocaldataserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocaldataserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
