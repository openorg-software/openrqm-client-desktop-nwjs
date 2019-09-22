import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RQMMenubarWorkspacesComponent } from './rqmmenubar-workspaces.component';

describe('RQMMenubarWorkspacesComponent', () => {
  let component: RQMMenubarWorkspacesComponent;
  let fixture: ComponentFixture<RQMMenubarWorkspacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RQMMenubarWorkspacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RQMMenubarWorkspacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
