///Dart package imports
import 'dart:html';
import 'package:angular/angular.dart';

///OpenRQM imports
import 'package:openrqm/api.dart';
import 'package:openrqm_client_desktop_nwjs/model/rqm_element_types.dart';
import 'package:openrqm_client_desktop_nwjs/utilities/rqm_api_service.dart';

import 'package:openrqm_client_desktop_nwjs/components/rqm_element_table.dart';
import 'package:openrqm_client_desktop_nwjs/components/rqm_menubar_document.dart';

@Component(
  selector: 'rqm-document-viewer',
  template: '''
  <div class="menubar">
    <rqm-menubar-document></rqm-menubar-document>
  </div>
  <div #container class="mainframe document-viewer">
  </div>
  ''',
  directives: [
    coreDirectives,
    RQMMenuBarDocument,
  ],
  providers: [
    ClassProvider(RQMApiService),
  ],
)
class RQMDocumentViewer implements AfterViewInit {
  @ViewChild('container', read: HtmlElement)
  HtmlElement tableContainer;

  @Input()
  RQMDocument document;
  @Input()
  int internalIdentifier;

  final RQMApiService _rqmApiService;
  RQMDocumentViewer(this._rqmApiService);

  @override
  ngAfterViewInit() {
    List<RQMElement> elements = _rqmApiService.fetchElementsOfDocument();
    int length = elements.length;
    print('elements ' + '$length');
    RQMElementTypes types =
        RQMElementTypes(types: _rqmApiService.fetchElementTypes());
    RQMElementTable rqmElementTable = RQMElementTable(
      elements: elements,
      types: types,
    );
    rqmElementTable.buildElementTable(tableContainer);
  }
}
