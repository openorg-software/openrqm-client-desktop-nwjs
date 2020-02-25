import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RQMUserSettingsModalComponent } from './rqmuser-settings-modal.component';

describe('RQMUserSettingsModalComponent', () => {
  let component: RQMUserSettingsModalComponent;
  let fixture: ComponentFixture<RQMUserSettingsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RQMUserSettingsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RQMUserSettingsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
