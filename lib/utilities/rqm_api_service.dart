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
      var result = api_instance.getWorkspaces();
      return result; 
    } catch (e) {
      print("Exception when calling DocumentApi->getDocument: $e\n");
    }
  }

  List<RQMElement> fetchElementsOfDocument() {
    List<RQMElement> elements = List<RQMElement>();
    return elements;
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
