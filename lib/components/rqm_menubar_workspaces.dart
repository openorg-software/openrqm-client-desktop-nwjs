///Dart package imports
import 'package:angular/angular.dart';

///Material Components
import 'package:angular_components/material_icon/material_icon.dart';
import 'package:angular_components/material_menu/material_menu.dart';
import 'package:angular_components/laminate/popup/module.dart';
import 'package:angular_components/laminate/overlay/zindexer.dart';
import 'package:angular_components/model/menu/menu.dart';

///OpenRQM imports

@Component(
  selector: 'rqm-menubar-workspaces',
  template: '''
    <material-menu [menu]="menuModel" [buttonText]="menuLabelFile">
    </material-menu>
    <material-menu [menu]="menuModel" [buttonText]="menuLabelEdit">
    </material-menu>
    <material-menu [menu]="menuModel" [buttonText]="menuLabelSettings">
    </material-menu>
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
class RQMMenuBarWorkspaces {
  var menuModel;
  MenuModel<MenuItem> menuModelWithIcon;

  String menuLabelFile = 'File';
  String menuLabelEdit = 'Edit';
  String menuLabelSettings = 'Settings';

  RQMMenuBarWorkspaces() {
    menuModel = MenuModel<MenuItem>([
      MenuItemGroup<MenuItem>([
        MenuItem('Load Workspaces'),
      ])
    ]);

    menuModelWithIcon = MenuModel<MenuItem>(menuModel.itemGroups);
  }
}
