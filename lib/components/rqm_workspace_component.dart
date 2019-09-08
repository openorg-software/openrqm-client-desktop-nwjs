import 'package:angular/angular.dart';
import 'package:openrqm_client_desktop_nwjs/components/rqm_document_component.dart';
import 'package:openrqm_client_desktop_nwjs/model/rqm_document.dart';
import 'package:openrqm_client_desktop_nwjs/model/rqm_workspace.dart';

@Component(
    selector: 'rqm-workspace',
    template: '''
    <div classes="workspaceTreeWorkspace" *ngIf="name != null && name != ''">{{name}}</div>
      <ul *ngIf="workspaces != null && documents != null">
        <li *ngIf="workspaces != null">
          <ul *ngFor="let workspace of workspaces" >
              <rqm-workspace [name]="workspace.name" [workspaceId]="workspace.workspaceId" [workspaces]="workspace.workspaces" [documents]="workspace.documents"></rqm-workspace>  
          </ul>
        </li>
        <li *ngIf="documents != null">
          <ul *ngFor="let document of documents">
              <rqm-document [name]="document.name">
              </rqm-document>
          </ul>
        </li>
      </ul>
  ''',
    directives: [coreDirectives, RQMWorkspaceComponent, RQMDocumentComponent])
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
