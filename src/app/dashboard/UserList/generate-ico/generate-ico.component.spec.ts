import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateIcoComponent } from './generate-ico.component';

describe('GenerateIcoComponent', () => {
  let component: GenerateIcoComponent;
  let fixture: ComponentFixture<GenerateIcoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateIcoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateIcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
