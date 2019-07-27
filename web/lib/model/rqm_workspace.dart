///Native Dart imports
import 'dart:html';

/// Additional package imports
import 'package:bootjack/bootjack.dart';

/// Imports of OpenRQM
import 'rqm_document.dart';

class RQMWorkspace {
  String name;
  int workspaceId;
  List<RQMWorkspace> workspaces;
  List<RQMDocument> documents;

  RQMWorkspace({this.name, this.workspaceId, this.workspaces, this.documents});

  LIElement buildWorkspaceTree() {
    LIElement thisElement = LIElement()..text = '$name';
    thisElement.className = 'workspaceTreeWorkspace';
    UListElement children = UListElement();

    if (workspaces != null) {
      for (RQMWorkspace wrkspc in workspaces) {
        children.children.add(wrkspc.buildWorkspaceTree());
      }
    }
    if (documents != null) {
      for (RQMDocument doc in documents) {
        children.children.add(doc.buildWorkspaceOverviewElement());
      }
    }
    thisElement.children.add(children);
    return thisElement;
  }
}
