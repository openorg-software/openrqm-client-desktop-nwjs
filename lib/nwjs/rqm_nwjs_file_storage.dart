import 'package:openrqm_client_desktop_nwjs/model/rqm_settings.dart';
import 'package:node_io/node_io.dart';

class RQMNwJsFileStorage {
  void saveSettings(RQMSettings settings) {
    String file = 'openrqm-settings.json';
    File f = File('C:\Users\benja\AppData\Local\test.txt');
    f.writeAsString('test');
  }

  RQMSettings loadSettings() {}
}
