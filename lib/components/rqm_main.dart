///Native Dart imports
import 'dart:html';

///Dart package imports
import 'package:angular/angular.dart';

///Material Components
import 'package:angular_components/material_icon/material_icon.dart';
import 'package:angular_components/material_menu/material_menu.dart';
import 'package:angular_components/laminate/popup/module.dart';
import 'package:angular_components/laminate/overlay/zindexer.dart';
import 'package:angular_components/model/menu/menu.dart';

///OpenRQM imports
import 'package:openrqm_client_desktop_nwjs/components/rqm_workspace_tree.dart';
import 'package:openrqm_client_desktop_nwjs/components/rqm_document_viewer.dart';
import 'package:openrqm_client_desktop_nwjs/components/rqm_menubar_workspaces.dart';
import 'package:openrqm_client_desktop_nwjs/utilities/rqm_event.dart';

@Component(selector: 'rqm-main', template: '''
  <div class="menubar">
  <rqm-menubar-workspaces></rqm-menubar-workspaces>
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
  RQMWorkspaceTree,
  RQMDocumentViewer,
  RQMMenuBarWorkspaces
])
class RQMMain implements RQMEvent {
  bool showWorkspaces = true;
  int documentInternalIdentifier;

  RQMMain() {
    ///Disable the default context menu of the app
    Element body = querySelector('#body');
    body.onContextMenu.listen((MouseEvent e) => e.preventDefault());
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
