import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvesterReferComponent } from './invester-refer.component';

describe('InvesterReferComponent', () => {
  let component: InvesterReferComponent;
  let fixture: ComponentFixture<InvesterReferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvesterReferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvesterReferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
