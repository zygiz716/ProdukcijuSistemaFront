import { TestBed } from '@angular/core/testing';

import { PlanoVykdymasService } from './plano-vykdymas.service';

describe('GrandineVykdymasService', () => {
  let service: PlanoVykdymasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanoVykdymasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
