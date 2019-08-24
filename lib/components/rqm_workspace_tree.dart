import 'package:angular_app/model/rqm_document.dart';

///Native Dart imports

import 'package:angular_app/model/rqm_workspace.dart';
import 'package:angular_app/model/rqm_workspace.template.dart';

import 'package:angular/angular.dart';
import 'package:angular_app/utilities/rqm_rest_connector.dart';

@Component(
  selector: 'workspace-tree',
  template: '''
  <ul>
      <rqm-workspace *ngFor="let workspace of workspaces" [name]="workspace.name" [workspaceId]="workspace.workspaceId" [workspaces]="workspace.workspaces" [documents]="workspace.documents"></rqm-workspace>
  </ul>
  ''',
  directives: [coreDirectives],
)
class RQMWorkspaceTree {
  List<RQMWorkspace> workspaces;

  RQMWorkspaceTree() {
    workspaces = RQMRestConnector().fetchWorkspaces();
  }
}
