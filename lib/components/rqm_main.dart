///Dart package imports
import 'package:angular/angular.dart';

///Material Components
import 'package:angular_components/material_icon/material_icon.dart';
import 'package:angular_components/material_menu/material_menu.dart';
import 'package:angular_components/laminate/popup/module.dart';
import 'package:angular_components/laminate/overlay/zindexer.dart';
import 'package:angular_components/model/menu/menu.dart';
import 'package:openrqm_client_desktop_nwjs/utilities/rqm_event.dart';

///OpenRQM imports
import 'package:openrqm_client_desktop_nwjs/components/rqm_workspace_tree.dart';
import 'package:openrqm_client_desktop_nwjs/components/rqm_document_viewer.dart';

@Component(selector: 'rqm-main', template: '''
  <div class="menubar">
    <material-menu [menu]="menuModel" [buttonText]="menuLabel">
    </material-menu>
    </div>
    <div class="mainframe">
      <rqm-workspace-tree *ngIf="showWorkspaces"></rqm-workspace-tree>
      <rqm-document-viewer *ngIf="!showWorkspaces" [internalIdentifier]="documentInternalIdentifier"></rqm-document-viewer>
    </div>
  ''', providers: [
  popupBindings,
  ClassProvider(ZIndexer),
], directives: [
  coreDirectives,
  MaterialIconComponent,
  MaterialMenuComponent,
  RQMWorkspaceTree,
  RQMDocumentViewer,
])
class RQMMain implements RQMEvent {
  String menuLabel = 'File';
  var menuModel;
  MenuModel<MenuItem> menuModelWithIcon;

  bool showWorkspaces = true;
  int documentInternalIdentifier;

  RQMMain() {
    menuModel = MenuModel<MenuItem>([
      MenuItemGroup<MenuItem>([
        MenuItem('Load Workspaces', action: () => loadWorkspaces()),
      ])
    ]);

    menuModelWithIcon = MenuModel<MenuItem>(menuModel.itemGroups);
  }

  void loadWorkspaces() {
    showWorkspaces = true;
  }

  @override
  void OnShowDocumentEvent(int internalIdentifier) {
    showDocument(internalIdentifier);
  }

  void showDocument(int internalIdentifier) {
    documentInternalIdentifier = internalIdentifier;
    showWorkspaces = false;
  }

  @override
  void OnShowWorkspacesEvent() {
    showWorkspaces = true;
  }
}
