import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RQMDocumentEditorComponent } from './rqmdocument-editor.component';

describe('RQMDocumentEditorComponent', () => {
  let component: RQMDocumentEditorComponent;
  let fixture: ComponentFixture<RQMDocumentEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RQMDocumentEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RQMDocumentEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
