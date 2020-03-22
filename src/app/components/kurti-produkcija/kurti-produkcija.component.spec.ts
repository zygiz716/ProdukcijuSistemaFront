import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KurtiProdukcijaComponent } from './kurti-produkcija.component';

describe('KurtiProdukcijaComponent', () => {
  let component: KurtiProdukcijaComponent;
  let fixture: ComponentFixture<KurtiProdukcijaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KurtiProdukcijaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KurtiProdukcijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
