import { TestBed } from '@angular/core/testing';

import { StoreLocalService } from './store-local.service';

describe('StoreLocalService', () => {
  let service: StoreLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
