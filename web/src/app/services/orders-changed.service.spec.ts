import { TestBed } from '@angular/core/testing';

import { OrdersChangedService } from './orders-changed.service';

describe('OrdersChangedService', () => {
  let service: OrdersChangedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdersChangedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
