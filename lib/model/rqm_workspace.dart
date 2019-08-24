import 'package:angular/angular.dart';
import 'package:angular_app/model/rqm_document.dart';

@Component(
  selector: 'rqm-workspace',
  template: '''
    <li>
      <li classes="workspaceTreeWorkspace">{{name}}</li>
      <ul *ngFor="let workspace of workspaces">
        <rqmworkspace >
        </rqmworkspace>
      </ul>
      <ul *ngFor="let document of documents">
        <document >
        </document>
      </ul>
    </li>
    ''',
  directives: [coreDirectives],
)
class RQMWorkspace {
  @Input()
  String name;
  @Input()
  int workspaceId;
  @Input()
  List<RQMWorkspace> workspaces;
  @Input()
  List<RQMDocument> documents;

  RQMWorkspace({
    this.name,
    this.workspaceId,
    this.workspaces,
    this.documents,
  });
}
