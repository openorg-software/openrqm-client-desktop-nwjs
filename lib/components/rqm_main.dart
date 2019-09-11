///Native Dart imports
import 'dart:html';

///Dart package imports
import 'package:angular/angular.dart';
import 'package:angular_router/angular_router.dart';
import 'package:angular_components/theme/dark_theme.dart';

///Material Components
import 'package:angular_components/material_icon/material_icon.dart';
import 'package:angular_components/material_menu/material_menu.dart';
import 'package:angular_components/laminate/popup/module.dart';
import 'package:angular_components/laminate/overlay/zindexer.dart';
import 'package:angular_components/model/menu/menu.dart';

///OpenRQM imports
import 'package:openrqm_client_desktop_nwjs/components/rqm_workspace_tree_component.dart';
import 'package:openrqm_client_desktop_nwjs/components/rqm_document_viewer.dart';
import 'package:openrqm_client_desktop_nwjs/components/rqm_menubar_workspaces.dart';
import 'package:openrqm_client_desktop_nwjs/utilities/rqm_api_service.dart';
import 'package:openrqm_client_desktop_nwjs/utilities/rqm_routes.dart';

@Component(
  selector: 'rqm-main',
  template: '''
  <div darkTheme>
    <router-outlet [routes]="RQMRoutes.allMainFrame"></router-outlet>
  </div>
  ''',
  providers: [
    popupBindings,
    ClassProvider(ZIndexer),
    ClassProvider(RQMApiService),
  ],
  directives: [
    coreDirectives,
    routerDirectives,
    DarkThemeDirective,
    RQMWorkspaceTreeComponent,
    RQMDocumentViewer,
    RQMMenuBarWorkspaces
  ],
  exports: [
    RQMRoutePaths,
    RQMRoutes,
  ],
)
class RQMMain {
  RQMMain() {
    ///Disable the default context menu of the app
    Element body = querySelector('#body');
    body.onContextMenu.listen((MouseEvent e) => e.preventDefault());
  }
}
