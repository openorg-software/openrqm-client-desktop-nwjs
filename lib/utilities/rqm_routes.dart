import 'package:angular_router/angular_router.dart';
import 'rqm_route_paths.dart';
import 'package:openrqm_client_desktop_nwjs/components/rqm_workspace_tree_component.template.dart'
    as rqm_workspace_tree;
import 'package:openrqm_client_desktop_nwjs/components/rqm_document_viewer.template.dart'
    as rqm_document_viewer;

export 'rqm_route_paths.dart';

class RQMRoutes {
  static final workspaceTree = RouteDefinition(
    routePath: RQMRoutePaths.workspaceTree,
    component: rqm_workspace_tree.RQMWorkspaceTreeComponentNgFactory,
  );
  static final documentViewer = RouteDefinition(
    routePath: RQMRoutePaths.documentViewer,
    component: rqm_document_viewer.RQMDocumentViewerNgFactory,
  );

  static final all = <RouteDefinition>[
    workspaceTree,
    documentViewer,
    RouteDefinition.redirect(
      path: '',
      redirectTo: RQMRoutePaths.workspaceTree.toUrl(),
    )
  ];
}
