import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RQMAssignUsersComponent } from './rqmassign-users.component';

describe('RQMAssignUsersComponent', () => {
  let component: RQMAssignUsersComponent;
  let fixture: ComponentFixture<RQMAssignUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RQMAssignUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RQMAssignUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
