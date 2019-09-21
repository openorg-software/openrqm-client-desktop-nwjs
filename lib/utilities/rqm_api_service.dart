/*
openrqm-client-desktop-nwjs
RQMApiService class
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

/// Native Dart imports
import 'dart:async';

/// Imports of OpenRQM
import 'package:openrqm/api.dart';

class RQMApiService {
  Future<List<RQMWorkspace>> fetchWorkspaces() async {
    ApiClient client = ApiClient(basePath: 'http://127.0.0.1:8090');
    var api_instance = WorkspacesApi(client);
    try {
      Future<List<RQMWorkspace>> result = api_instance.getWorkspaces();
      return orderListOfWorkspaces(result);
    } catch (e) {
      print("Exception when calling DocumentApi->getDocument: $e\n");
    }
    return List<RQMWorkspace>();
  }

  Future<List<RQMWorkspace>> orderListOfWorkspaces(
      Future<List<RQMWorkspace>> list) async {
    List<RQMWorkspace> fetchedSpaces = await list;
    fetchedSpaces.forEach((workspace) => print(workspace.toString()));
    List<RQMWorkspace> parents = fetchedSpaces
        .where((workspace) => workspace.workspaceId == null)
        .toList();
    parents.forEach((workspace) => workspace.workspaces = fetchedSpaces
        .where((innerWorkspace) => workspace.id == innerWorkspace.workspaceId)
        .toList());
    parents.forEach((workspace) => print(workspace.toString()));
    return parents;
  }

  Future<List<RQMElement>> fetchElementsOfDocument(int documentId) {
    ApiClient client = ApiClient(basePath: 'http://127.0.0.1:8090');
    var api_instance = ElementsApi(client);
    try {
      var result = api_instance.getElements(documentid: documentId);
      return result;
    } catch (e) {
      print("Exception when calling DocumentApi->getDocument: $e\n");
    }
  }

  Map<int, String> fetchElementTypes() {
    Map<int, String> types = {
      1: 'Requirement',
      2: 'Remote Requirement',
      3: 'Realization',
      4: 'Test'
    };

    return types;
  }
}
