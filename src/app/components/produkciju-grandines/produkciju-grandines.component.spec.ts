import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdukcijuGrandinesComponent } from './produkciju-grandines.component';

describe('ProdukcijuGrandinesComponent', () => {
  let component: ProdukcijuGrandinesComponent;
  let fixture: ComponentFixture<ProdukcijuGrandinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdukcijuGrandinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdukcijuGrandinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
