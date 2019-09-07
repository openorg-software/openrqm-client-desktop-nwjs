import 'package:angular/angular.dart';
import 'package:openrqm_client_desktop_nwjs/model/rqm_document.dart';

@Component(selector: 'rqm-workspace', template: '''
    <div classes="workspaceTreeWorkspace" *ngIf="name != ''">{{name}}</div>
      <ul>
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
  ''', directives: [coreDirectives, RQMWorkspace, RQMDocument])
class RQMWorkspace {
  @Input()
  String name;
  @Input()
  int workspaceId;
  @Input()
  List<RQMWorkspace> workspaces;
  @Input()
  List<RQMDocument> documents;

  RQMWorkspace({
    this.name,
    this.workspaceId,
    this.workspaces,
    this.documents,
  });
}
