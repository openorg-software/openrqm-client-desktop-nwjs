/*
openrqm-client-desktop-nwjs
openrqm-client application entry point
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

///Native Dart imports
import 'dart:html';

/// Additional package imports
import 'package:bootjack/bootjack.dart';

/// Imports of OpenRQM
import 'lib/model/rqm_workspace.dart';
import 'lib/model/rqm_document.dart';
import 'lib/utilities/rqm_rest_connector.dart';

void main() {
  Button.use();
  Dropdown.use();
  Tab.use();

  ButtonElement btn = querySelector('#button');
  btn.onClick.listen(call);
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
