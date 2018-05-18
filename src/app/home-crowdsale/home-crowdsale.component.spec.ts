import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCrowdsaleComponent } from './home-crowdsale.component';

describe('HomeCrowdsaleComponent', () => {
  let component: HomeCrowdsaleComponent;
  let fixture: ComponentFixture<HomeCrowdsaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeCrowdsaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCrowdsaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
