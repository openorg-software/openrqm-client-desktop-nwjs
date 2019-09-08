///Dart package imports
import 'package:angular/angular.dart';

///Material Components
import 'package:angular_components/material_menu/material_menu.dart';
import 'package:angular_components/laminate/popup/module.dart';
import 'package:angular_components/laminate/overlay/zindexer.dart';
import 'package:angular_components/laminate/components/modal/modal.dart';
import 'package:angular_components/material_button/material_button.dart';
import 'package:angular_components/material_dialog/material_dialog.dart';
import 'package:angular_components/model/menu/menu.dart';

///OpenRQM imports

@Component(
  selector: 'rqm-settings',
  template: '''
  
    <material-button (trigger)="showDialogWithError = true"
                 [disabled]="showDialogWithError">{{menuLabelSettings}}
    </material-button>
    <modal [(visible)]="showDialogWithError">
      <material-dialog headered
                      class="dialog-with-error"
                      [error]="dialogWithErrorErrorMessage">

        <div header>
          <h1>Settings</h1>
        </div>

        <material-button raised (trigger)="toggleErrorMessage()">
          {{dialogWithErrorErrorMessage == null ? 'Show' : 'Hide'}} Error Message
        </material-button>

        <div footer>
          <material-button autoFocus class="close-button" (trigger)="showDialogWithError = false">
            Close
          </material-button>
        </div>

      </material-dialog>
    </modal>
  ''',
  providers: [
    popupBindings,
    ClassProvider(ZIndexer),
  ],
  directives: [
    coreDirectives,
    MaterialButtonComponent,
    MaterialDialogComponent,
    ModalComponent,
  ],
  styleUrls: ['rqm_settings_component.scss.css'],
)
class RQMSettings {
  String menuLabelSettings = 'Settings';
  String dialogWithErrorErrorMessage;
  bool showDialogWithError = false;

  RQMSettings() {}

  void toggleErrorMessage() {
    if (dialogWithErrorErrorMessage == null) {
      dialogWithErrorErrorMessage = 'Error message.';
    } else {
      dialogWithErrorErrorMessage = null;
    }
  }
}
