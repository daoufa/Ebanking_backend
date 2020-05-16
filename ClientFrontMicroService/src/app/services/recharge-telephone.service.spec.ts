import { TestBed } from '@angular/core/testing';

import { RechargeTelephoneService } from './recharge-telephone.service';

describe('RechargeTelephoneService', () => {
  let service: RechargeTelephoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RechargeTelephoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
