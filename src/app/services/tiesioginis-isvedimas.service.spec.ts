import { TestBed } from '@angular/core/testing';

import { TiesioginisIsvedimasService } from './tiesioginis-isvedimas.service';

describe('TiesioginisIsvedimasService', () => {
  let service: TiesioginisIsvedimasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiesioginisIsvedimasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
