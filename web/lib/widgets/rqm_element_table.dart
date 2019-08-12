/*
openrqm-client-desktop-nwjs
RQMElementTable class
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import 'dart:html';

import '../model/rqm_element.dart';

class RQMElementTable {
  List<RQMElement> elements;

  TableElement table;

  List<TableColElement> columns;

  RQMElementTable({this.elements});

  TableSectionElement buildElementTableHead(TableSectionElement tableHead) {
    TableRowElement headRow = TableRowElement();
    headRow.children.add(TableCellElement()
      ..children.add(DivElement()
        ..text = 'Content'
        ..className = 'rqmElementTitle'));
    headRow.children.add(TableCellElement()
      ..text = 'REQ Type'
      ..className = 'rqmElementTitle');

    tableHead.children.add(headRow);
    return tableHead;
  }

  TableSectionElement buildElementTable(TableSectionElement tableBody) {
    for (RQMElement e in elements) {
      TableRowElement row = e.buildElementRow();
      tableBody.children.add(row);
    }

    return tableBody;
  }

  void resize() {}
}
