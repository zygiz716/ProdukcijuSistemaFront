import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanoKurimasComponent } from './plano-kurimas.component';

describe('PlanoKurimasComponent', () => {
  let component: PlanoKurimasComponent;
  let fixture: ComponentFixture<PlanoKurimasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanoKurimasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanoKurimasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
