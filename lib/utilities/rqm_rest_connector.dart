/*
openrqm-client-desktop-nwjs
RQMRestConnector class
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

/// Imports of OpenRQM
import 'package:angular_app/model/rqm_workspace.dart';
import 'package:angular_app/model/rqm_document.dart';
import 'package:angular_app/model/rqm_element.dart';

class RQMRestConnector {
  List<RQMWorkspace> fetchWorkspaces() {
    print('Fetching workspaces');
    List<RQMWorkspace> workspaces = List<RQMWorkspace>();
    List<RQMDocument> documents = new List<RQMDocument>();
    List<RQMWorkspace> innerWorkspaces = new List<RQMWorkspace>();
    List<RQMDocument> innerDocuments = new List<RQMDocument>();
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
      name: 'Workspace 2',
    ));

    workspaces.add(RQMWorkspace(
      name: 'RQM Workspace',
      workspaceId: 1,
      documents: documents,
      workspaces: innerWorkspaces,
    ));
    workspaces.add(RQMWorkspace(
      name: 'RQM Workspace2',
      workspaceId: 2,
      documents: documents,
      workspaces: innerWorkspaces,
    ));

    return workspaces;
  }

  List<RQMElement> fetchElementsOfDocument(int internalIdentifier) {
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
    return elements;
  }

  Map<int, String> fetchDocumentTypes() {
    Map<int, String> types = {
      1: 'Requirement',
      2: 'Remote Requirement',
      3: 'Realization',
      4: 'Test'
    };

    return types;
  }
}
