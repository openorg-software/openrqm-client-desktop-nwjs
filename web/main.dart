import 'package:angular/angular.dart';
import 'package:angular_router/angular_router.dart';

import 'package:openrqm_client_desktop_nwjs/components/app_component.template.dart'
    as ng;

import 'main.template.dart' as self;

@GenerateInjector(
  routerProvidersHash,
)
final InjectorFactory injector = self.injector$Injector;

void main() {
  runApp(ng.AppComponentNgFactory, createInjector: injector);
}

void call(MouseEvent event) {
  UListElement workspaceTree = querySelector('#workspaceTree');
  workspaceTree.children.clear();

  RQMRestConnector rest = RQMRestConnector();
  rest.fetchWorkspaces();
  for (RQMWorkspace wrkspc in rest.workspaces) {
    workspaceTree.children.add(wrkspc.buildWorkspaceTree());
  }
}
