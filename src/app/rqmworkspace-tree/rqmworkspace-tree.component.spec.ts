import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RQMWorkspaceTreeComponent } from './rqmworkspace-tree.component';

describe('RQMWorkspaceTreeComponent', () => {
  let component: RQMWorkspaceTreeComponent;
  let fixture: ComponentFixture<RQMWorkspaceTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RQMWorkspaceTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RQMWorkspaceTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
