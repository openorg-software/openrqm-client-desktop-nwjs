import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RQMLoginComponent } from './rqmlogin.component';

describe('RQMLoginComponent', () => {
  let component: RQMLoginComponent;
  let fixture: ComponentFixture<RQMLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RQMLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RQMLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
