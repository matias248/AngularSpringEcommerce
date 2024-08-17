import { TestBed } from '@angular/core/testing';

import { ProductLocalService } from './product-local.service';

describe('ProductLocalService', () => {
  let service: ProductLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
