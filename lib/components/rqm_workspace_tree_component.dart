///Dart package imports
import 'package:angular/angular.dart';

///Material Components

///RQM imports
import 'package:openrqm_client_desktop_nwjs/utilities/rqm_api_service.dart';
import 'package:openrqm_client_desktop_nwjs/model/rqm_workspace.dart';
import 'package:openrqm_client_desktop_nwjs/components/rqm_workspace_component.dart';

@Component(selector: 'rqm-workspace-tree', template: '''

              <ul *ngFor="let workspace of workspaces" >
              <rqm-workspace [name]="workspace.name" [workspaceId]="workspace.workspaceId" [workspaces]="workspace.workspaces" [documents]="workspace.documents"></rqm-workspace>  
          </ul>
  ''', directives: [
  coreDirectives,
  RQMWorkspaceComponent,
], providers: [
  ClassProvider(RQMApiService)
])
class RQMWorkspaceTreeComponent implements OnInit {
  List<RQMWorkspace> workspaces;

  final RQMApiService _rqmApiService;

  RQMWorkspaceTreeComponent(this._rqmApiService);

  @override
  void ngOnInit() {
    _rqmApiService
        .fetchWorkspaces()
        .then((workspaces) => this.workspaces = workspaces);
  }
}
