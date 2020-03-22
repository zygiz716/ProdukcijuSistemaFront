import { TestBed } from '@angular/core/testing';

import { ProdukcijaService } from './produkcija.service';

describe('ProdukcijaService', () => {
  let service: ProdukcijaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdukcijaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
