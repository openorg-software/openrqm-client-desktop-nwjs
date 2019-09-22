import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RQMDocumentComponent } from './rqmdocument.component';

describe('RQMDocumentComponent', () => {
  let component: RQMDocumentComponent;
  let fixture: ComponentFixture<RQMDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RQMDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RQMDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
