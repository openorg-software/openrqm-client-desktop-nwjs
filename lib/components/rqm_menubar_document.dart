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
