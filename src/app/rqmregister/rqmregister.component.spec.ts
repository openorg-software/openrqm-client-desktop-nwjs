import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RQMRegisterComponent } from './rqmregister.component';

describe('RQMRegisterComponent', () => {
  let component: RQMRegisterComponent;
  let fixture: ComponentFixture<RQMRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RQMRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RQMRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
