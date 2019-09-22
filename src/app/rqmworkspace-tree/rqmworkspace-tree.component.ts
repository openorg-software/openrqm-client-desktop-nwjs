import { CollectionViewer, SelectionChange } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RQMWorkspace, WorkspacesService, } from 'openrqm-api';


export class WorkspaceFlatNode {
  constructor(public id: number, public name: string, public isWorkspace = false, public level = 1, public expandable = false,
    public isLoading = false) { }
}

export class WorkspaceDatabase {

  workspacesService: WorkspacesService;
  workspaces: RQMWorkspace[] = new Array();
  wsnodes: WorkspaceFlatNode[] = new Array();


  setWorkspaceService(workspaceService: WorkspacesService) {
    this.workspacesService = workspaceService;
  }

  constructor() {
    this.wsnodes.push(new WorkspaceFlatNode(123, "test", true, 0, true));
    console.log("WorkspaceDatabase constructed");
  }

  initialData() {
    this.workspacesService.getWorkspaces().subscribe(
      {
        next(ws) {
          this.workspaces = ws;
          console.log(this.workspaces);
        },
        complete() {
          this.workspaces.forEach((ws) => {
            if (ws.workspace_id == null) {
              console.log(this.wsnodes);
              this.wsnodes.push(new WorkspaceFlatNode(ws.id, ws.name, true, 0, true))
            }
          });
          console.log("completed");
          console.log(this.wsnodes);
        }
      }
    );
  }

  getChildren(id: number): WorkspaceFlatNode[] | undefined {
    let children: WorkspaceFlatNode[] = new Array();
    console.log(this.workspaces);
    this.workspaces.forEach((ws) => {
      if (ws.workspaceId == id) {
        ws.workspaces.forEach((innerWs) => {
          children.push(new WorkspaceFlatNode(innerWs.id, innerWs.name, true, 0, true))
        });
        ws.documents.forEach((doc) => {
          children.push(new WorkspaceFlatNode(doc.id, doc.name, false, 0, true))
        });
      }
    })
    return children;
  }

  isExpandable(id: number): boolean {
    return this.workspaces.find((ws) => ws.id = id).workspaces.length > 0 || this.workspaces.find((ws) => ws.id = id).documents.length > 0;
  }
}

@Injectable()
export class WorkspaceSource {

  dataChange = new BehaviorSubject<WorkspaceFlatNode[]>([]);

  get data(): WorkspaceFlatNode[] {
    console.log("get data");
    console.log(this.dataChange.value);
    return this.dataChange.value;
  }
  set data(value: WorkspaceFlatNode[]) {
    console.log("set data");
    console.log(value);
    this._treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  constructor(private _treeControl: FlatTreeControl<WorkspaceFlatNode>,
    private _database: WorkspaceDatabase) {
    console.log(this._database);
  }



  connect(collectionViewer: CollectionViewer): Observable<WorkspaceFlatNode[]> {
    this._treeControl.expansionModel.onChange.subscribe(change => {
      if ((change as SelectionChange<WorkspaceFlatNode>).added ||
        (change as SelectionChange<WorkspaceFlatNode>).removed) {
        this.handleTreeControl(change as SelectionChange<WorkspaceFlatNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
  }

  /** Handle expand/collapse behaviors */
  handleTreeControl(change: SelectionChange<WorkspaceFlatNode>) {
    if (change.added) {
      change.added.forEach(node => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed.slice().reverse().forEach(node => this.toggleNode(node, false));
    }
  }

  /**
   * Toggle the node, remove from display list
   */
  toggleNode(node: WorkspaceFlatNode, expand: boolean) {
    const children = this._database.getChildren(node.id);
    const index = this.data.indexOf(node);
    if (!children || index < 0) { // If no children, or cannot find the node, no op
      return;
    }

    node.isLoading = true;

    setTimeout(() => {
      if (expand) {
        const nodes = children.map(node =>
          new WorkspaceFlatNode(node.id, name, false, node.level + 1, this._database.isExpandable(node.id)));
        this.data.splice(index + 1, 0, ...nodes);
      } else {
        let count = 0;
        for (let i = index + 1; i < this.data.length
          && this.data[i].level > node.level; i++ , count++) { }
        this.data.splice(index + 1, count);
      }

      // notify the change
      this.dataChange.next(this.data);
      node.isLoading = false;
    }, 1000);
  }
}

@Component({
  selector: 'rqmworkspace-tree',
  templateUrl: './rqmworkspace-tree.component.html',
  styleUrls: ['./rqmworkspace-tree.component.scss'],
  providers: [WorkspaceDatabase, WorkspacesService]
})
export class RQMWorkspaceTreeComponent implements OnInit {

  treeControl: FlatTreeControl<WorkspaceFlatNode>;
  dataSource: WorkspaceSource;
  database: WorkspaceDatabase
  constructor(database: WorkspaceDatabase, workspaceService: WorkspacesService) {
    this.treeControl = new FlatTreeControl<WorkspaceFlatNode>(this.getLevel, this.isExpandable);
    this.database = database;
    this.database.setWorkspaceService(workspaceService);
    this.dataSource = new WorkspaceSource(this.treeControl, this.database);
  }
  ngOnInit() {
    this.database.initialData();
    this.dataSource.data = this.database.wsnodes;
  }

  getLevel = (node: WorkspaceFlatNode) => node.level;

  isExpandable = (node: WorkspaceFlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: WorkspaceFlatNode) => _nodeData.expandable;
}
