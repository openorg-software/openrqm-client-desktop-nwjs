import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RQMAssignAccessGroupComponent } from './rqmassign-access-group.component';

describe('RQMAssignAccessGroupComponent', () => {
  let component: RQMAssignAccessGroupComponent;
  let fixture: ComponentFixture<RQMAssignAccessGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RQMAssignAccessGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RQMAssignAccessGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
