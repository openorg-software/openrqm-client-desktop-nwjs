import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import TurndownService from 'turndown';

import { ToastService } from '@siemens/ix-angular';

import { ElementsService, LinksService, RQMElement, RQMElementType, DocumentsService, RQMLink, RQMLinkType, OpenAPI } from '../openrqm-api';
import { RQMSettingsService } from '../rqmsettings.service';
import { RQMUserService } from '../rqmuser.service';
import { RQMElementWrapper } from './rqmelement-wrapper';

export class LinkWrapper {
  constructor(public documentId: number, public documentShortName: string, public elementId: number) { }
}

@Component({
  standalone: false,
  selector: 'app-rqmdocument-editor',
  templateUrl: './rqmdocument-editor.component.html',
  styleUrls: ['./rqmdocument-editor.component.css']
})
export class RQMDocumentEditorComponent implements OnInit {

  contextMenuVisible: boolean = false;
  contextMenuPosition = { x: '0px', y: '0px' };
  contextElementId: number = -1;

  @ViewChild('elementTable', { static: false }) elementTable;
  wrappedElements: RQMElementWrapper[] = [];
  elements: RQMElement[] = [];
  elementTypes: RQMElementType[] = [];
  documentId: number;
  documentShortName: string = "";

  @Input() linking: boolean = false;
  @Input() linkingDocumentId: number = -1;
  @Input() linkTo: boolean = false;
  @Input() linkFrom: boolean = false;
  @Input() inputReadOnly: boolean = false;
  @Output() createLink = new EventEmitter<LinkWrapper>();
  selectedId: number = -1;
  oldSelectedId: number = -1;

  @Input() requirementColor: string;
  @Input() proseColor: string;

  public showLinks: boolean = false;
  links: RQMLink[] = [];
  linkTypes: RQMLinkType[] = [];

  private turndownService = new TurndownService();

  markdownEditorOptions = {
    iconlibrary: 'fa',
    resize: 'vertical',
    autofocus: false,
  };
  displayedColumns: string[];

  constructor(private elementsService: ElementsService, private toastService: ToastService, private router: Router, private route: ActivatedRoute, private settingsService: RQMSettingsService, private documentsSerivce: DocumentsService, private linksService: LinksService, private userService: RQMUserService) {
    OpenAPI.BASE = this.settingsService.getApiBasePath();
    OpenAPI.TOKEN = this.userService.getToken();
  }

  ngOnInit() {
    if (this.linking && this.linkingDocumentId != -1) {
      this.documentId = this.linkingDocumentId;
    } else {
      this.documentId = parseInt(this.route.snapshot.paramMap.get('id'));
    }
    let dateTimeBeforeGetDocument = new Date();
    if (this.documentShortName == null || this.documentShortName == "") {
      console.log("fetched short name");
      this.documentsSerivce.getDocument(this.documentId).subscribe(
        doc => {
          this.documentShortName = doc.shortName;
        },
        err => {
          console.log(err);
        },
        () => {
          console.log(this.documentShortName);
        }
      );
    }
    let dateTimeAfterGetDocument = new Date();
    console.log('Miliseconds for getDocument ' + (dateTimeAfterGetDocument.getTime() - dateTimeBeforeGetDocument.getTime()));

    let dateTimeBeforeGetElements = new Date();
    if (this.elements == null || this.elements.length == 0) {
      console.log("fetched elements");
      this.elementsService.getElements(this.documentId).subscribe(
        el => {
          this.elements = el;
        },
        err => {
          console.log(err);
        },
        () => {
          console.log(this.elements);
          if (this.elements.length == 0) {
            this.addFirstElement();
          }
          this.documentsSerivce.getLinksOfDocument(this.documentId).subscribe(
            links => {
              this.links = links;
            },
            err => {
              console.log(err);
            },
            () => {
              console.log(this.links);
              this.linksService.getLinkTypes().subscribe(
                linkTypes => {
                  this.linkTypes = linkTypes;

                  let dateTimeBeforeAttachLinks = new Date();
                  this.elements.forEach((element) => {
                    let inlinks: RQMLink[] = [];
                    let outlinks: RQMLink[] = [];
                    this.links.forEach((link) => {
                      if (link.toElementId == element.id && link.toDocumentId == element.documentId) {
                        inlinks.push(link);
                      }
                    });
                    this.links.forEach((link) => {
                      if (link.fromElementId == element.id && link.fromDocumentId == element.documentId) {
                        outlinks.push(link);
                      }
                    });
                    this.wrappedElements.push(
                      new RQMElementWrapper(element, inlinks, outlinks)
                    );
                  });
                  let dateTimeAfterAttachLinks = new Date();
                  console.log('Miliseconds for attach links ' + (dateTimeAfterAttachLinks.getTime() - dateTimeBeforeAttachLinks.getTime()));
                  console.log('Wrapped Elements:');
                  console.log(this.wrappedElements);
                  this.elements.forEach((element) => {
                    if (element.content) {
                      element.content = this.turndownService.turndown(element.content);
                    }
                  });
                },
                err => {
                  console.log(err);
                },
                () => {
                  console.log(this.linkTypes);
                }
              );
            }
          );
        }
      );
    }
    let dateTimeAfterGetElements = new Date();
    console.log('Miliseconds for getElements ' + (dateTimeAfterGetElements.getTime() - dateTimeBeforeGetElements.getTime()));
    if (this.elementTypes == null || this.elementTypes.length == 0) {
      console.log("fetched element types");
      this.elementsService.getElementTypes().subscribe(
        types => {
          this.elementTypes = types;
        },
        err => {
          console.log(err);
        },
        () => {
          console.log(this.elementTypes);
        }
      );
    }

    if (this.displayedColumns == null || this.displayedColumns.length == 0) {
      if (this.linking) {
        this.displayedColumns = ['link', 'id', 'elementTypeId', 'parentElementId', 'content'];
      } else {
        this.displayedColumns = ['id', 'elementTypeId', 'parentElementId', 'content'];
      }
    }

  }

  onContextMenu(event: MouseEvent, elementId: number) {
    console.log(elementId);
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextElementId = elementId;
    this.contextMenuVisible = true;
  }

  toggleShowLinks() {
    this.showLinks = !this.showLinks;
    if (this.showLinks) {
      this.displayedColumns.push('links');
    } else {
      this.displayedColumns.splice(this.displayedColumns.indexOf('links'), 1);
    }
  }

  addFirstElement(): void {
    let aboveRank: string = "aaaaaaaaaaaaaaaaaaaa";
    let belowRank: string = "";

    let element = {} as RQMElement;
    element.content = "";
    element.documentId = parseInt(this.route.snapshot.paramMap.get('id'));
    element.elementTypeId = 1;
    element.rank = "0";
    element.id = 0;
    element.parentElementId = null;

    this.elementsService.postElement(aboveRank, belowRank, element).subscribe(
      next => {
        console.log('next');
        console.log(next);
      },
      err => {
        console.log('err');
        console.log(err);
      },
      () => {
        console.log('add element done');
        this.elements.push(element);
        this.reloadPage();
      }
    );
  }

  addElementAfter(aboveElementId: number): void {
    console.log(aboveElementId);
    let aboveRank: string = "";
    let belowRank: string = "";
    let parentElementId: number = -1;

    for (let tempElement of this.elements) {
      if (tempElement.id == aboveElementId) {
        let aboveElement: RQMElement = tempElement;
        let belowElement: RQMElement = null;
        if (this.elements.length > this.elements.indexOf(aboveElement) + 1) {
          belowElement = this.elements[this.elements.indexOf(aboveElement) + 1];
          if (aboveElement.parentElementId != belowElement.parentElementId) {
            let lastParentId: number = null;
            let parentFound: boolean = false;
            let lastIndex: number = null;
            for (let newElement of this.elements) {
              if (newElement.parentElementId == aboveElement.id) {
                parentFound = true;
                lastParentId = newElement.parentElementId;
                lastIndex = this.elements.indexOf(newElement);
                continue;
              }
              if (parentFound && lastParentId != null && lastParentId != newElement.parentElementId) {
                aboveElement = this.elements[lastIndex];
                belowElement = newElement;
                break;
              }
              lastParentId = newElement.parentElementId;
              lastIndex = this.elements.indexOf(newElement);
            }
          }
        }

        parentElementId = tempElement.parentElementId;
        aboveRank = aboveElement.rank;
        if (belowElement != null) {
          belowRank = belowElement.rank;
        }
        console.log(aboveRank);
        console.log(belowRank);
        if (belowRank == null) {
          belowRank = "";
        }
      }
    }
    if (aboveRank == "" || belowRank == "" || parentElementId == -1) {
      console.log('could not determine aboveRank or belowRank');
    }

    let element = {} as RQMElement;
    element.content = "";
    element.documentId = parseInt(this.route.snapshot.paramMap.get('id'));
    element.elementTypeId = 1;
    element.rank = "0";
    element.id = 0;
    element.parentElementId = parentElementId == 0 ? null : parentElementId;

    this.elementsService.postElement(aboveRank, belowRank, element).subscribe(
      next => {
        console.log('next');
        console.log(next);
      },
      err => {
        console.log('err');
        console.log(err);
        this.toastService.show({ message: 'Failed adding element after ' + this.documentShortName + aboveElementId + '. Error: ' + err, type: 'error' });
      },
      () => {
        console.log('add element done');
        this.elements.push(element);
        this.toastService.show({ message: 'Added element after ' + this.documentShortName + aboveElementId + '.' });
      }
    );
  }

  addElementBelow(aboveElementId: number): void {
    console.log(aboveElementId);
    let aboveRank: string = "";
    let belowRank: string = "";

    for (let tempElement of this.elements) {
      if (tempElement.id == aboveElementId) {
        aboveRank = tempElement.rank;

        if (this.elements.length > this.elements.indexOf(tempElement) + 1) {
          belowRank = this.elements[this.elements.indexOf(tempElement) + 1].rank;
        }

      }
    }
    if (aboveRank == "" || belowRank == "" || aboveElementId == -1) {
      console.log('could not determine aboveId or belowId');
    }

    let element = {} as RQMElement;
    element.content = "";
    element.documentId = parseInt(this.route.snapshot.paramMap.get('id'));
    element.elementTypeId = 1;
    element.rank = "0";
    element.id = 0;
    element.parentElementId = aboveElementId;

    this.elementsService.postElement(aboveRank, belowRank, element).subscribe(
      next => {
        console.log('next');
        console.log(next);
      },
      err => {
        console.log('err');
        console.log(err);
      },
      () => {
        console.log('add element done');
        this.elements.push(element);
        this.toastService.show({ message: 'Added element below ' + this.documentShortName + aboveElementId + '.' });
        this.reloadPage();
      }
    );


  }

  deleteElement(elementId: number): void {
    console.log(elementId);

    let element: RQMElement;
    for (let tempElement of this.elements) {
      if (tempElement.id == elementId) {
        element = tempElement;
      }
    }
    console.log(element);
    this.elementsService.deleteElement(element.id).subscribe(
      next => {
        console.log('next');
        console.log(next);
      },
      err => {
        console.log('err');
        console.log(err);
      },
      () => {
        console.log('delete element done');
        this.elements.splice(this.elements.indexOf(element), 1);
        this.toastService.show({ message: 'Deleted element ' + this.documentShortName + elementId + '.' });
        this.reloadPage();
      }
    );
  }

  onBlurMarkdownEditor(elementId: number, content: string) {
    console.log(content);
    this.saveElement(elementId, null, content, null);
  }

  onElementTypeChange(newValue: number, elementId: number) {
    console.log(newValue);
    this.saveElement(elementId, newValue, null, null);
  }

  saveElement(elementId: number, type: number, content: string, parent: number) {
    console.log(elementId);
    let changed: boolean = false;
    let element: RQMElement;
    for (let tempElement of this.elements) {
      if (tempElement.id == elementId) {
        element = tempElement;
      }
    }

    if (type != null && element.elementTypeId != type) {
      element.elementTypeId = type;
      changed = true;
    }
    if (content != null && element.content != content) {
      element.content = content;
      changed = true;
    }
    if (parent != null && element.parentElementId != parent) {
      element.parentElementId = parent;
      changed = true;
    }
    if (element.parentElementId == 0) {
      element.parentElementId = null;
    }

    if (changed == true) {
      console.log(element);
      this.elementsService.patchElement(element).subscribe(
        next => {
          console.log('next');
          console.log(next);
        },
        err => {
          console.log('err');
          console.log(err);
        },
        () => {
          console.log('patching element done');
          let index: number = this.elements.findIndex(el => el.id == elementId);
          this.elements[index] = element;
          this.toastService.show({ message: 'Saved element ' + this.documentShortName + elementId + '.' });
        }
      );
    }

  }

  link(id: number) {
    console.log('Link ' + (this.linkTo ? 'to' : 'from') + ' ' + id);
    if (this.linkFrom) {
      this.selectedId = id;
    }
    this.createLink.emit(new LinkWrapper(this.documentId, this.documentShortName, id));
  }

  reloadPage() {
    this.router.navigate(['/document-viewer', this.documentId, this.documentShortName]);
  }

}
