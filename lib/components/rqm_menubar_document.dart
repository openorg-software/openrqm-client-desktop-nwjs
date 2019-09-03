///Dart package imports
import 'dart:html';
import 'package:angular/angular.dart';

///Material Components
import 'package:angular_components/material_icon/material_icon.dart';
import 'package:angular_components/material_menu/material_menu.dart';
import 'package:angular_components/laminate/popup/module.dart';
import 'package:angular_components/laminate/overlay/zindexer.dart';
import 'package:angular_components/model/menu/menu.dart';

///OpenRQM imports
import 'package:openrqm_client_desktop_nwjs/model/rqm_document.dart';
import 'package:openrqm_client_desktop_nwjs/model/rqm_element.dart';
import 'package:openrqm_client_desktop_nwjs/model/rqm_element_types.dart';

import 'package:openrqm_client_desktop_nwjs/utilities/rqm_rest_connector.dart';

import 'package:openrqm_client_desktop_nwjs/components/rqm_element_table.dart';

@Component(
  selector: 'rqm-menubar-document',
  template: '''
  <div #container class="document-viewer">
  </div>
  ''',
  providers: [
    popupBindings,
    ClassProvider(ZIndexer),
  ],
  directives: [
    coreDirectives,
    MaterialIconComponent,
    MaterialMenuComponent,
  ],
)
class RQMMenuBarDocument {}