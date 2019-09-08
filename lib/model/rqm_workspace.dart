import 'package:openrqm_client_desktop_nwjs/model/rqm_document.dart';

class RQMWorkspace {
  String name;
  int workspaceId;
  List<RQMWorkspace> workspaces;
  List<RQMDocument> documents;

  RQMWorkspace({
    this.name,
    this.workspaceId,
    this.workspaces,
    this.documents,
  });
}
