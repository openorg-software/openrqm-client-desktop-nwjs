import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RQMWorkspaceComponent } from './rqmworkspace.component';

describe('RQMWorkspaceComponent', () => {
  let component: RQMWorkspaceComponent;
  let fixture: ComponentFixture<RQMWorkspaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RQMWorkspaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RQMWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
