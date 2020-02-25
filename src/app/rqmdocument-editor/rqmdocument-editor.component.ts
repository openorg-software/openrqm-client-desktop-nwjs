// Angular
import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// CKEditor
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import * as InlineEditor from '@ckeditor/ckeditor5-build-inline';
import Base64UploaderPlugin from 'src/@ckeditor/Base64Upload';
// Material Design
import { MatMenuTrigger } from '@angular/material'

// OpenRQM
import { ElementsService, RQMElement, RQMElementType } from 'openrqm-api';
import { RQMSettingsService } from '../rqmsettings.service';

@Component({
  selector: 'app-rqmdocument-editor',
  templateUrl: './rqmdocument-editor.component.html',
  styleUrls: ['./rqmdocument-editor.component.css']
})
export class RQMDocumentEditorComponent implements OnInit {

  // For context menu
  @ViewChild(MatMenuTrigger, { static: false })
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

  // For CKEditor
  public Editor = InlineEditor;
  editorConfig = {
    placeholder: 'Type the content here!',
    extraPlugins: [Base64UploaderPlugin],
  };
  displayedColumns: string[];

  // For OpenRQM API
  elements: RQMElement[] = [];
  elementTypes: RQMElementType[] = [];
  id: string;  
  documentShortName: String;

  // For linking
  @Input() linking: boolean = false;
  @Input() linkTo: boolean = false;
  @Input() linkFrom: boolean = false;
  @Output() createLink = new EventEmitter<number>();

  constructor(private elementsService: ElementsService, private router: Router, private route: ActivatedRoute, private settingsService: RQMSettingsService) {
    //Initialization
    this.elementsService = elementsService;
    this.elementsService.configuration.basePath = this.settingsService.getApiBasePath();
   }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.documentShortName = this.route.snapshot.paramMap.get('shortname');
    this.elementsService.getElements(parseInt(this.id)).subscribe(
      el => {
        this.elements = el;
      },
      err => {
        console.log(err);
      },
      () => {
        console.log(this.elements);
        if (this.elements.length == 0) {
          // this.addFirstElement();
        }
      }
    );
    this.elementsService.getElementTypes().subscribe(
      types => {
        types.forEach(element => {
          this.elementTypes[element.id] = element;
        });
      },
      err => {
        console.log(err);
      },
      () => {
        console.log(this.elementTypes);
      }
    );
    
    if(this.linking){
      this.displayedColumns = ['link', 'id', 'elementTypeId', 'parentElementId', 'content'];
    } else {
      this.displayedColumns = ['id', 'elementTypeId', 'parentElementId', 'content', 'rank'];
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
    for (let element of this.elements) {
      if (element.id == aboveElementId) {
        let aboveElement: RQMElement = element;
        let belowElement: RQMElement = null;
        if (this.elements.length > this.elements.indexOf(aboveElement) + 1) {
          belowElement = this.elements[this.elements.indexOf(aboveElement) + 1];
          //if parentId of above is different from parent id of below
          if (aboveElement.parentElementId != belowElement.parentElementId) {
            //look for last child element of aboveElement and set as new aboveElement
            let lastParentId: number = null;
            let parentFound: Boolean = false;
            let lastIndex: number = null;
            for (let newElement of this.elements) {
              // If the newElement has the aboveElement as the parent we are in the correct location in the tree
              if (newElement.parentElementId == aboveElement.id) {
                parentFound = true;
                lastParentId = newElement.parentElementId;
                lastIndex = this.elements.indexOf(newElement);
                continue;
              }
              // If we are in the correct location in the tree and the parentId changed, the newElement  in the belowElement and the last element is the above element.
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
        parentElementId = element.parentElementId;
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
      },
      () => {
        console.log('add element done');
        this.elements.push(element);
      }
    );
    this.router.navigate(['/document-viewer', this.id, this.documentShortName]);
  }


  // Add an element below the current element
  addElementBelow(aboveElementId: number): void {
    console.log(aboveElementId);
    let aboveRank: string = "";
    let belowRank: string = "";

    for (let element of this.elements) {
      if (element.id == aboveElementId) {
        aboveRank = element.rank;

        if (this.elements.length > this.elements.indexOf(element) + 1) {
          belowRank = this.elements[this.elements.indexOf(element) + 1].rank;
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
      }
    );

    //this.router.navigate(['/document-viewer', this.id, this.documentShortName]);
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
      }
    );
    //this.router.navigate(['/document-viewer', this.id, this.documentShortName]);
  }

  onBlurCKeditor({ editor }: ChangeEvent, elementId: number) {
    const data = editor.getData();
    console.log(data);
    this.saveElement(elementId, null, data, null);
  }

  saveElement(elementId: number, type: number, content: string, parent: number) {
    console.log(elementId);
    let changed: Boolean = false;
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
        }
      );
      //this.router.navigate(['/document-viewer', this.id, this.documentShortName]);
    }

  }

  link(id: number){
    console.log('Link ' + (this.linkTo ? 'to' : 'from') + ' ' + id);
    this.createLink.emit(id);
  }

}
