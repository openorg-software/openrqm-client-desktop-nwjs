///Dart package imports
import 'package:angular/angular.dart';

///Material Components
import 'package:angular_components/material_icon/material_icon.dart';
import 'package:angular_components/material_menu/material_menu.dart';
import 'package:angular_components/laminate/popup/module.dart';
import 'package:angular_components/laminate/overlay/zindexer.dart';

///RQM imports
import 'package:openrqm_client_desktop_nwjs/utilities/rqm_rest_connector.dart';
import 'package:openrqm_client_desktop_nwjs/model/rqm_workspace.dart';
import 'package:openrqm_client_desktop_nwjs/components/rqm_main.dart';

@Component(
  selector: 'rqm-workspace-tree',
  template: '''
    <rqm-workspace [workspaces]="workspaces">
    </rqm-workspace>
  ''',
  directives: [
    coreDirectives,
    RQMWorkspace,
  ],
)
class RQMWorkspaceTree {
  List<RQMWorkspace> workspaces;

  RQMWorkspaceTree() {
    loadWorkspaces();
  }

  void loadWorkspaces() {
    workspaces = RQMRestConnector().fetchWorkspaces();
  }
}
