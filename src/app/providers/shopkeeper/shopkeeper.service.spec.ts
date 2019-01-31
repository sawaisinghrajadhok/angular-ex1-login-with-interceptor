import { TestBed } from '@angular/core/testing';

import { ShopkeeperService } from './shopkeeper.service';

describe('ShopkeeperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShopkeeperService = TestBed.get(ShopkeeperService);
    expect(service).toBeTruthy();
  });
});
