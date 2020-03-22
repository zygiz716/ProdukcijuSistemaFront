import { TestBed } from '@angular/core/testing';

import { ProdukcijuGrandineService } from './produkciju-grandine.service';

describe('ProdukcijuGrandineService', () => {
  let service: ProdukcijuGrandineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdukcijuGrandineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
