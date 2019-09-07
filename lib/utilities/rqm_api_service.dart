/*
openrqm-client-desktop-nwjs
RQMApiService class
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

/// Native Dart imports
import 'dart:async';

/// Imports of OpenRQM
import 'package:openrqm_client_desktop_nwjs/model/rqm_workspace.dart';
import 'package:openrqm_client_desktop_nwjs/model/rqm_document.dart';
import 'package:openrqm_client_desktop_nwjs/model/rqm_element.dart';

class RQMApiService {
  Future<List<RQMWorkspace>> fetchWorkspaces() async {
    print('Fetching workspaces');
    List<RQMWorkspace> workspaces = List<RQMWorkspace>();
    List<RQMDocument> documents = List<RQMDocument>();
    List<RQMWorkspace> innerWorkspaces = List<RQMWorkspace>();
    List<RQMDocument> innerDocuments = List<RQMDocument>();
    documents.add(RQMDocument(
      workspaceId: 1,
      internalIdentifier: 1,
      externalIdentifier: 'ID01',
      name: 'docOne',
      description: 'docOne Description',
      confidentiality: 'restricted',
      authorId: 1,
      languageId: 1,
      approverId: 2,
      reviewerText: 'See Review',
      lastModifiedById: 1,
      lastModifiedOn: DateTime(2019, 07, 27),
      baselineMajor: 0,
      baselineMinor: 0,
      baselineReview: 0,
      previousBaseline: 0,
    ));

    innerDocuments.add(RQMDocument(
      workspaceId: 2,
      internalIdentifier: 2,
      externalIdentifier: 'ID02',
      name: 'docTwo',
      description: 'docOne Description',
      confidentiality: 'restricted',
      authorId: 1,
      languageId: 1,
      approverId: 2,
      reviewerText: 'See Review',
      lastModifiedById: 1,
      lastModifiedOn: DateTime(2019, 07, 27),
      baselineMajor: 0,
      baselineMinor: 0,
      baselineReview: 0,
      previousBaseline: 0,
    ));

    innerWorkspaces.add(RQMWorkspace(
      documents: innerDocuments,
      workspaceId: 2,
      name: 'Inner Workspace',
    ));

    workspaces.add(RQMWorkspace(
      name: 'RQM Workspace',
      workspaceId: 1,
      documents: documents,
      workspaces: innerWorkspaces,
    ));
    workspaces.add(RQMWorkspace(
      name: 'RQM Workspace 2',
      workspaceId: 2,
      documents: documents,
      workspaces: innerWorkspaces,
    ));

    return workspaces;
  }

  List<RQMElement> fetchElementsOfDocument() {
    List<RQMElement> elements = List<RQMElement>();
    elements.add(RQMElement(
      content:
          "The openrqm-server shall support a REST call to fetch all workspaces with their attributes as JSON.",
      elementTypeId: 1,
      rank: '123',
    ));
    elements.add(RQMElement(
      content:
          "The openrqm-server shall support a REST call to fetch all elements of a document specified by it's internal identifier as JSON.",
      elementTypeId: 1,
      rank: '123',
    ));

    for (int i = 0; i < 100; i++) {
      elements.add(RQMElement(
        content:
            "The openrqm-server shall support a REST call to fetch all elements of a document specified by it's internal identifier as JSON.",
        elementTypeId: 1,
        rank: '123',
      ));
    }
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
