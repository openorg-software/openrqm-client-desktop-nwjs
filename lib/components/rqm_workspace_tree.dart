///Native Dart imports
import 'package:angular/angular.dart';

///RQM imports
import 'package:angular_app/utilities/rqm_rest_connector.dart';
import 'package:angular_app/model/rqm_workspace.template.dart';
import 'package:angular_app/model/rqm_workspace.dart';

@Component(
  selector: 'workspace-tree',
  template: '''
    <rqm-workspace [workspaces]="workspaces">
    </rqm-workspace>
  ''',
  directives: [coreDirectives, RQMWorkspace],
)
class RQMWorkspaceTree {
  List<RQMWorkspace> workspaces;

  RQMWorkspaceTree() {
    workspaces = RQMRestConnector().fetchWorkspaces();
  }
}
