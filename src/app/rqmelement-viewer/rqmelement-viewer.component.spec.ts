import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RQMElementViewerComponent } from './rqmelement-viewer.component';

describe('RQMElementViewerComponent', () => {
  let component: RQMElementViewerComponent;
  let fixture: ComponentFixture<RQMElementViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RQMElementViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RQMElementViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
