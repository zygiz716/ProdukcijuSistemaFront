import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrandinesVykdymasComponent } from './grandines-vykdymas.component';

describe('GrandinesVykdymasComponent', () => {
  let component: GrandinesVykdymasComponent;
  let fixture: ComponentFixture<GrandinesVykdymasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrandinesVykdymasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrandinesVykdymasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
