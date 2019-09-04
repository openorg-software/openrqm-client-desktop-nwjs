///Dart package imports
import 'dart:html';
import 'package:angular/angular.dart';

///OpenRQM imports
import 'package:openrqm_client_desktop_nwjs/model/rqm_document.dart';
import 'package:openrqm_client_desktop_nwjs/model/rqm_element.dart';
import 'package:openrqm_client_desktop_nwjs/model/rqm_element_types.dart';

import 'package:openrqm_client_desktop_nwjs/utilities/rqm_rest_connector.dart';

import 'package:openrqm_client_desktop_nwjs/components/rqm_element_table.dart';

@Component(
  selector: 'rqm-document-viewer',
  template: '''
  <div #container class="document-viewer">
  </div>
  ''',
  directives: [
    coreDirectives,
  ],
)
class RQMDocumentViewer implements AfterViewInit {
  @ViewChild('container', read: HtmlElement)
  HtmlElement tableContainer;

  @Input()
  RQMDocument document;
  @Input()
  int internalIdentifier;

  @override
  ngAfterViewInit() {
    RQMRestConnector restConnector = RQMRestConnector();
    List<RQMElement> elements = restConnector.fetchElementsOfDocument();
    int length = elements.length;
    print('elements ' + '$length');
    RQMElementTypes types =
        RQMElementTypes(types: restConnector.fetchElementTypes());
    RQMElementTable rqmElementTable = RQMElementTable(
      elements: elements,
      types: types,
    );
    rqmElementTable.buildElementTable(tableContainer);
  }
}
