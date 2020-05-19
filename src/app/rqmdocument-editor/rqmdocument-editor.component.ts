// Angular
import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// CKEditor
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import * as InlineEditor from '@ckeditor/ckeditor5-build-inline';

//Requires custom ckeditor build, postponed for now
/*
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties';
import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
*/

// Custom CKEditor Plugins
import Base64UploaderPlugin from '../../@ckeditor/Base64UploaderPlugin';

// Material Design
import { MatMenuTrigger } from '@angular/material'
import { MatSnackBar } from '@angular/material/snack-bar';

// OpenRQM
import { ElementsService, LinksService, RQMElement, RQMElementType, DocumentsService, RQMLink, RQMLinkType } from 'openrqm-api';
import { RQMSettingsService } from '../rqmsettings.service';
import { RQMUserService } from '../rqmuser.service';
import { RQMMultiLineSnackBarComponent } from '../rqmmulti-line-snack-bar/rqmmulti-line-snack-bar.component';
import { RQMElementWrapper } from './rqmelement-wrapper';

export class LinkWrapper {
  constructor(public documentId: number, public documentShortName: string, public elementId: number) { }
}

@Component({
  selector: 'app-rqmdocument-editor',
  templateUrl: './rqmdocument-editor.component.html',
  styleUrls: ['./rqmdocument-editor.component.css']
})
export class RQMDocumentEditorComponent implements OnInit {

  // For context menu
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

  // For CKEditor
  public Editor = InlineEditor;
  editorConfig = {
    placeholder: 'Type the content here!',
    extraPlugins: [Base64UploaderPlugin],
    //Requires custom ckeditor build, postponed for now
    //   plugins: [Table, TableToolbar, TableProperties, TableCellProperties, Image, ImageToolbar, ImageCaption, ImageStyle, ImageResize],
    toolbar: ['heading', '|', 'bold', 'italic', 'link', '|', 'bulletedList', 'numberedList', '|', 'indent', 'outdent', 'blockQuote', '|', 'imageUpload', 'insertTable'],
    //Requires custom ckeditor build, postponed for now
    /*table: {
      contentToolbar: [
        'tableColumn', 'tableRow', 'mergeTableCells',
        'tableProperties', 'tableCellProperties'
      ],
    },
    image: {
      toolbar: ['imageTextAlternative', '|', 'imageStyle:full', 'imageStyle:side']
    }*/
  };
  displayedColumns: string[];

  // For OpenRQM API
  @ViewChild('elementTable') elementTable;
  @ViewChild('editorElement') editorElement;
  wrappedElements: RQMElementWrapper[] = [];
  elements: RQMElement[] = [];
  elementTypes: RQMElementType[] = [];
  documentId: number;
  documentShortName: string = "";

  // For linking
  @Input() linking: boolean = false;
  @Input() linkingDocumentId: number = -1;
  @Input() linkTo: boolean = false;
  @Input() linkFrom: boolean = false;
  @Output() createLink = new EventEmitter<LinkWrapper>();
  selectedId: number = -1;
  oldSelectedId: number = -1;

  // For Theme
  @Input() requirementColor: string;
  @Input() proseColor: string;

  // For displaying links
  private showLinks: boolean = false;
  links: RQMLink[] = [];
  linkTypes: RQMLinkType[] = [];

  constructor(private elementsService: ElementsService, private _snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute, private settingsService: RQMSettingsService, private documentsSerivce: DocumentsService, private linksService: LinksService, private userService: RQMUserService) {
    //Initialization
    this.elementsService.configuration.basePath = this.settingsService.getApiBasePath();
    this.elementsService.configuration.apiKeys = {};
    this.elementsService.configuration.apiKeys['token'] = this.userService.getToken();
    this.documentsSerivce.configuration.basePath = this.settingsService.getApiBasePath();
    this.documentsSerivce.configuration.apiKeys = {};
    this.documentsSerivce.configuration.apiKeys['token'] = this.userService.getToken();
  }

  ngOnInit() {
    if (this.linking && this.linkingDocumentId != -1) {
      this.documentId = this.linkingDocumentId;
    } else {
      this.documentId = parseInt(this.route.snapshot.paramMap.get('id'));
    }
    // Fetch the document name to display the IDs correctly
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

    // Fetch all elements
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
          // Fetch all links of the document
          this.documentsSerivce.getLinksOfDocument(this.documentId).subscribe(
            links => {
              this.links = links;
            },
            err => {
              console.log(err);
            },
            () => {
              console.log(this.links);
              // Fetch all link types
              this.linksService.getLinkTypes().subscribe(
                linkTypes => {
                  this.linkTypes = linkTypes;
                  //Attach links to elements

                  let dateTimeBeforeAttachLinks = new Date();
                  this.elements.forEach((element) => {
                    let inlinks: RQMLink[] = [];
                    let outlinks: RQMLink[] = [];
                    //Figure out inlinks
                    this.links.forEach((link) => {
                      if (link.toElementId == element.id && link.toDocumentId == element.documentId) {
                        inlinks.push(link);
                      }
                    });
                    //Figure out outlinks
                    this.links.forEach((link) => {
                      if (link.fromElementId == element.id && link.fromDocumentId == element.documentId) {
                        outlinks.push(link);
                      }
                    });
                    //Merge elements and corresponding links
                    this.wrappedElements.push(
                      new RQMElementWrapper(element, inlinks, outlinks)
                    );
                  });
                  let dateTimeAfterAttachLinks = new Date();
                  console.log('Miliseconds for attach links ' + (dateTimeAfterAttachLinks.getTime() - dateTimeBeforeAttachLinks.getTime()));
                  console.log('Wrapped Elements:');
                  console.log(this.wrappedElements);
                  this.elementTable.renderRows();
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
    // Fetch all element types
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

    // Set the columns which should be displayed
    if (this.displayedColumns == null || this.displayedColumns.length == 0) {
      // If the linking is enabled we have to show the link column which contains the button to select the source/target of the link
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
    this.contextMenu.menuData = { 'elementId': elementId };
    this.contextMenu.openMenu();
  }

  toggleShowLinks() {
    this.showLinks = !this.showLinks;
    if (this.showLinks) {
      this.displayedColumns.push('links');
    } else {
      this.displayedColumns.splice(this.displayedColumns.indexOf('links'), 1);
    }
  }



  // Add the first element of the document to initialize
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


  // Add an element after the current element
  addElementAfter(aboveElementId: number): void {
    console.log(aboveElementId);
    let aboveRank: string = "";
    let belowRank: string = "";
    let parentElementId: number = -1;


    // go through all elements, if element id matches aboveElementId 
    for (let tempElement of this.elements) {
      if (tempElement.id == aboveElementId) {
        let aboveElement: RQMElement = tempElement;
        let belowElement: RQMElement = null;
        if (this.elements.length > this.elements.indexOf(aboveElement) + 1) {
          belowElement = this.elements[this.elements.indexOf(aboveElement) + 1];
          //if parentId of above is different from parent id of below
          if (aboveElement.parentElementId != belowElement.parentElementId) {
            //look for last child element of aboveElement and set as new aboveElement
            let lastParentId: number = null;
            let parentFound: boolean = false;
            let lastIndex: number = null;
            for (let newElement of this.elements) {
              // If the newElement has the aboveElement as the parent we are in the correct location in the tree
              if (newElement.parentElementId == aboveElement.id) {
                parentFound = true;
                lastParentId = newElement.parentElementId;
                lastIndex = this.elements.indexOf(newElement);
                continue;
              }
              // If we are in the correct location in the tree and the parentId changed, the newElement in the belowElement and the last element is the above element.
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

        // if parentId of above and below is the same, take them
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
      //return;
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
        this.openSnackBar(["Failed adding element after " + this.documentShortName + aboveElementId + ".", "Error: " + err]);
      },
      () => {
        console.log('add element done');
        this.elements.push(element);
        this.openSnackBar(["Added element after " + this.documentShortName + aboveElementId + "."]);
        // this.reloadPage();
      }
    );
  }


  // Add an element below the current element
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
      //return;
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
        this.openSnackBar(["Added element below " + this.documentShortName + aboveElementId + "."]);
        this.reloadPage();
      }
    );


  }

  // Add an element below the current element
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
        this.openSnackBar(["Deleted element " + this.documentShortName + elementId + "."]);
        this.reloadPage();
      }
    );
  }

  onBlurCKeditor({ editor }: ChangeEvent, elementId: number) {
    const data = editor.getData();
    console.log(data);
    this.saveElement(elementId, null, data, null);

    console.log(editor);
  }

  onElementTypeChange(typeDropdownEvent, elementId: number) {
    console.log(typeDropdownEvent.value);
    this.saveElement(elementId, typeDropdownEvent.value, null, null);
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
          this.openSnackBar(["Saved element " + this.documentShortName + elementId + "."]);
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

  openSnackBar(messages: string[]) {
    console.log("Open SnackBar: " + messages);
    this._snackBar.openFromComponent(RQMMultiLineSnackBarComponent, {
      data: messages,
      duration: 3000
    },
    );
  }
}
