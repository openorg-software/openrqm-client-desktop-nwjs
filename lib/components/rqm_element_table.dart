/*
openrqm-client-desktop-nwjs
RQMElementTable class
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import 'dart:html';

import 'package:slickdart/slick.dart' as grid;

import 'package:openrqm/api.dart';
import 'package:openrqm_client_desktop_nwjs/model/rqm_element_types.dart';

class RQMElementTable {
  List<RQMElement> elements;
  RQMElementTypes types;

  TableElement table;

  List<TableColElement> columns;

  RQMElementTable({this.elements, this.types});

  String contentFormatter(
      int row, int cell, value, grid.Column columnDef, Map dataRow) {
    return '''<p style=' white-space: normal;'>$value</p>''';
  }

  HtmlElement buildElementTable(HtmlElement container) {
    List data = [];
    for (RQMElement e in elements) {
      data.add({
        'reqId': elements.indexOf(e),
        'elementTypeId':
            types.translateRequirementTypeIdToString(e.elementTypeId),
        'content': e.content,
      });
    }

    var columns = <grid.Column>[
      grid.Column.fromMap({'width': 10, 'name': "Id", 'field': "reqId"}),
      grid.Column.fromMap({
        'width': 15,
        'name': "Type",
        'field': "elementTypeId",
      }),
      grid.Column.fromMap({
        'name': "Content",
        'field': "content",
        'editor': 'TextEditor',
        'formatter': contentFormatter
      })
    ];
    columns.forEach((grid.Column _) {
      _.minWidth = 10;
    });

    var opt = grid.GridOptions()
      ..enableColumnReorder = true
      ..explicitInitialization = false
      ..multiColumnSort = false
      ..forceFitColumns = true
      ..dynamicHeight = true
      ..editable = true;
    grid.SlickGrid sg = grid.SlickGrid.fromOpt(container, data, [], opt);

    sg.onBeforeEditCell.subscribe((e, args) {
      //swap editor here
      print('onBeforeEditCell');
      print(args['column']);
    });

    sg.onColumnsResized.subscribe((e, args) {
      print('onColumnsResized');
      sg.resetDynHeight();
    });

    sg.onActiveCellBlur.subscribe((e, args) {
      print('onActiveCellBlur');
      print(args['old']);
      print(args['new']);
      sg.commitCurrentEdit();
    });

    sg.setSelectionModel(grid.RowSelectionModel(sg.options));
    sg.onSort.subscribe(grid.basicSorter);
    sg.init();
    sg.setColumns(columns);
    sg.invalidate();
    sg.render();

    return container;
  }

  void resize() {}
}
