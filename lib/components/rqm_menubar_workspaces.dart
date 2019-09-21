///Dart package imports
import 'package:angular/angular.dart';

///Material Components
import 'package:angular_components/material_icon/material_icon.dart';
import 'package:angular_components/material_menu/material_menu.dart';
import 'package:angular_components/laminate/popup/module.dart';
import 'package:angular_components/laminate/overlay/zindexer.dart';
import 'package:angular_components/model/menu/menu.dart';

///OpenRQM imports
import 'package:openrqm_client_desktop_nwjs/components/rqm_settings_component.dart';

@Component(
  selector: 'rqm-menubar-workspaces',
  template: '''
    <material-menu [menu]="menuModel" [buttonText]="menuLabelFile">
    </material-menu>
    <material-menu [menu]="menuModel" [buttonText]="menuLabelEdit">
    </material-menu>
    <rqm-settings></rqm-settings>
  ''',
  providers: [
    popupBindings,
    ClassProvider(ZIndexer),
  ],
  directives: [
    coreDirectives,
    MaterialIconComponent,
    MaterialMenuComponent,
    RQMSettingsComponent
  ],
)
class RQMMenuBarWorkspaces {
  var menuModel;
  String menuLabelFile = 'File';
  String menuLabelEdit = 'Edit';
  RQMMenuBarWorkspaces() {
    menuModel = MenuModel<MenuItem>([
      MenuItemGroup<MenuItem>([
        MenuItem('Load Workspaces'),
      ])
    ]);
  }
}
