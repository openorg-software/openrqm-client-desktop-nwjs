/*
openrqm-client-desktop-nwjs
Document dart code
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
import 'lib/model/rqm_element.dart';
import 'lib/utilities/rqm_rest_connector.dart';
import 'lib/widgets/rqm_element_table.dart';

void main() {
  Dropdown.use();

  TitleElement title = querySelector('#title');
  String documentName = Uri.base.queryParameters['name'];
  int internalIdentifier = int.parse(Uri.base.queryParameters['id']);
  title..text = 'OpenRQM - $documentName';

  RQMRestConnector restConnector = RQMRestConnector();
  List<RQMElement> elements =
      restConnector.fetchElementsOfDocument(internalIdentifier);

  RQMElementTable rqmElementTable = RQMElementTable(
    elements: elements,
  );

  TableSectionElement elementList = querySelector('#elementList');
  rqmElementTable.buildElementTable(elementList);
}
