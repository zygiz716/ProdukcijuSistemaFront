import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KurtiGrandineComponent } from './kurti-grandine.component';

describe('PlanoKurimasComponent', () => {
  let component: KurtiGrandineComponent;
  let fixture: ComponentFixture<KurtiGrandineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KurtiGrandineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KurtiGrandineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
