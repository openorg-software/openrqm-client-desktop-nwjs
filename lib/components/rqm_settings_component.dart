///Dart package imports
import 'package:angular/angular.dart';

///Material Components
import 'package:angular_components/laminate/popup/module.dart';
import 'package:angular_components/laminate/overlay/zindexer.dart';
import 'package:angular_components/laminate/components/modal/modal.dart';
import 'package:angular_components/material_button/material_button.dart';
import 'package:angular_components/material_dialog/material_dialog.dart';
import 'package:openrqm_client_desktop_nwjs/model/rqm_settings.dart';
import 'package:openrqm_client_desktop_nwjs/nwjs/rqm_nwjs_file_storage.dart';

///OpenRQM imports

@Component(
  selector: 'rqm-settings',
  template: '''
  
    <material-button (trigger)="showSettings = true"
                 [disabled]="showSettings">{{menuLabelSettings}}
    </material-button>
    <modal [(visible)]="showSettings">
      <material-dialog headered
                      class="dialog-with-error"
                      >

        <div header>
          <h1>Settings</h1>
        </div>

        <material-button raised (trigger)="darkModeEnabled = !darkModeEnabled">
          {{darkModeEnabled == false ? 'Enable' : 'Disable'}} Dark Mode
        </material-button>
                  <material-button raised (trigger)="storeSettings()">
            Save
          </material-button>
        <div footer>          

          <material-button autoFocus class="close-button" (trigger)="showSettings = false">
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
class RQMSettingsComponent {
  String menuLabelSettings = 'Settings';
  bool darkModeEnabled = false;
  bool showSettings = false;

  RQMSettingsComponent() {}

  void storeSettings() {
    RQMNwJsFileStorage filestore = RQMNwJsFileStorage();
    filestore.saveSettings(RQMSettings());
  }
}
