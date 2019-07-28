///Native Dart imports
import 'dart:html';

/// Additional package imports
import 'package:bootjack/bootjack.dart';

/// Imports of OpenRQM
import 'lib/model/rqm_workspace.dart';
import 'lib/model/rqm_document.dart';
import 'lib/model/rqm_element.dart';
import 'lib/utilities/rqm_rest_connector.dart';

void main() {
  TitleElement title = querySelector('#title');
  String documentName = Uri.base.queryParameters['name'];
  int internalIdentifier = int.parse(Uri.base.queryParameters['id']);
  title..text = 'OpenRQM - $documentName';

  RQMRestConnector restConnector = RQMRestConnector();
  List<RQMElement> elements =
      restConnector.fetchElementsOfDocument(internalIdentifier);

  TableSectionElement elementListHead = querySelector('#elementListHead');
  TableRowElement headRow = TableRowElement();
  headRow.children.add(TableCellElement()
    ..children.add(DivElement()
      ..text = 'Content'
      ..className = 'rqmElementContent'));
  headRow.children.add(TableCellElement()..text = 'REQ Type');
  elementListHead.children.add(headRow);

  TableSectionElement elementList = querySelector('#elementList');
  for (RQMElement e in elements) {
    TableRowElement row = e.buildElementRow();
    elementList.children.add(row);
  }
}
