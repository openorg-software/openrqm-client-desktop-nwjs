///Dart package imports
import 'package:angular/angular.dart';
import 'package:openrqm_client_desktop_nwjs/components/rqm_menubar_workspaces.dart';

///Material Components

///RQM imports
import 'package:openrqm/api.dart';
import 'package:openrqm_client_desktop_nwjs/utilities/rqm_api_service.dart';
import 'package:openrqm_client_desktop_nwjs/components/rqm_workspace_component.dart';

@Component(
  selector: 'rqm-workspace-tree',
  template: '''
  <div class="menubar">
    <rqm-menubar-workspaces></rqm-menubar-workspaces>
  </div>
  <div class="mainframe">
    <ul *ngFor="let workspace of workspaces" >
      <rqm-workspace [name]="workspace.name" [workspaceId]="workspace.workspaceId" [workspaces]="workspace.workspaces" [documents]="workspace.documents"></rqm-workspace>  
    </ul>
  </div>
  ''',
  directives: [
    coreDirectives,
    RQMWorkspaceComponent,
    RQMMenuBarWorkspaces,
  ],
  providers: [
    ClassProvider(RQMApiService),
  ],
)
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
