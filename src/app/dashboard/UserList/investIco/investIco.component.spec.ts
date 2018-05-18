import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestIcoComponent } from './investIco.Component';

describe('ViewUserComponent', () => {
  let component: InvestIcoComponent;
  let fixture: ComponentFixture<InvestIcoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestIcoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestIcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});