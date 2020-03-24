import { TestBed } from '@angular/core/testing';

import { GrandineVykdymasService } from './grandine-vykdymas.service';

describe('GrandineVykdymasService', () => {
  let service: GrandineVykdymasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrandineVykdymasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
