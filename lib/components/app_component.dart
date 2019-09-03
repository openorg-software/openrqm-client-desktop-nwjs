///Dart package imports
import 'package:angular/angular.dart';
import 'package:openrqm_client_desktop_nwjs/components/rqm_main.dart';

@Component(
  selector: 'app-component',
  template: '''
  <rqm-main></rqm-main>
  ''',
  directives: [coreDirectives, RQMMain],
)
class AppComponent {}
