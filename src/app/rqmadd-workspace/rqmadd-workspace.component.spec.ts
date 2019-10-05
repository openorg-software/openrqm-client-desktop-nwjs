import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RQMAddWorkspaceComponent } from './rqmadd-workspace.component';

describe('RQMAddWorkspaceComponent', () => {
  let component: RQMAddWorkspaceComponent;
  let fixture: ComponentFixture<RQMAddWorkspaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RQMAddWorkspaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RQMAddWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
