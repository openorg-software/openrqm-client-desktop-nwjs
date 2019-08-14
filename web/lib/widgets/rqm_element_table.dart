/*
openrqm-client-desktop-nwjs
RQMElementTable class
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import 'dart:html';

import '../model/rqm_element.dart';
import 'package:slickdart/slick.dart' as grid;
import 'dart:math' as math;

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
    List data = [];
    for (RQMElement e in elements) {
      data.add({
        'reqId': elements.indexOf(e),
        'elementTypeId': e.elementTypeId,
        'content': e.content
      });
    }

    var columns = <grid.Column>[
      new grid.Column.fromMap({'width': 10, 'name': "Id", 'field': "reqId"}),
      new grid.Column.fromMap(
          {'width': 15, 'name': "Type", 'field': "elementTypeId"}),
      new grid.Column.fromMap(
          {'name': "Content", 'field': "content", 'editor': 'TextEditor'})
    ];
    columns.forEach((grid.Column _) {
      _.minWidth = 10;
    });

    Element el = querySelector('#workspace');
    var opt = new grid.GridOptions()
      ..enableColumnReorder = true
      ..explicitInitialization = false
      ..multiColumnSort = false
      ..forceFitColumns = true
      ..editable = true;
    grid.SlickGrid sg = new grid.SlickGrid.fromOpt(el, data, [], opt);

    sg.onBeforeEditCell.subscribe((e, args) {
      //swap editor here
      print(args['column']);
    });
    sg.onActiveCellBlur.subscribe((e, args) {
      print(args['old']);
      print(args['new']);
      sg.commitCurrentEdit();
    });

    sg.onSort.subscribe(grid.basicSorter);
    sg.init();
    sg.setColumns(columns);
    sg.invalidate();
    sg.render();
  }

  void resize() {}
}
