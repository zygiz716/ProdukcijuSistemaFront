import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiesioginisIsvedimasComponent } from './tiesioginis-isvedimas.component';

describe('TiesioginisIsvedimasComponent', () => {
  let component: TiesioginisIsvedimasComponent;
  let fixture: ComponentFixture<TiesioginisIsvedimasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiesioginisIsvedimasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiesioginisIsvedimasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
