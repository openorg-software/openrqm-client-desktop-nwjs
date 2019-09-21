import 'package:angular/angular.dart';
import 'package:openrqm_client_desktop_nwjs/components/rqm_document_component.dart';
import 'package:openrqm/api.dart';

@Component(
  selector: 'rqm-workspace',
  template: '''
    <div classes="workspaceTreeWorkspace" *ngIf="name != null && name != ''">{{name}}</div>
      <ul *ngIf="workspaces != null || documents != null">
        <div *ngIf="workspaces != null">
          <li *ngFor="let workspace of workspaces" >
              <rqm-workspace [name]="workspace.name" [workspaceId]="workspace.workspaceId" [workspaces]="workspace.workspaces" [documents]="workspace.documents"></rqm-workspace>  
          </li>
        </div>
        <div *ngIf="documents != null">
          <li *ngFor="let document of documents">
              <rqm-document [name]="document.name">
              </rqm-document>
          </li>
        </div>
      </ul>
  ''',
  directives: [
    coreDirectives,
    RQMWorkspaceComponent,
    RQMDocumentComponent,
  ],
)
class RQMWorkspaceComponent {
  @Input()
  String name;
  @Input()
  int workspaceId;
  @Input()
  List<RQMWorkspace> workspaces;
  @Input()
  List<RQMDocument> documents;

  RQMWorkspaceComponent({
    this.name,
    this.workspaceId,
    this.workspaces,
    this.documents,
  });
}
