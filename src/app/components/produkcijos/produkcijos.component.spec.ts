import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdukcijosComponent } from './produkcijos.component';

describe('ProdukcijosComponent', () => {
  let component: ProdukcijosComponent;
  let fixture: ComponentFixture<ProdukcijosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdukcijosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdukcijosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
