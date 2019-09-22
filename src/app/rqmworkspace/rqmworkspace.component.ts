import { Component, OnInit, Input } from '@angular/core';
import { RQMWorkspace, RQMDocument } from 'openrqm-api';

@Component({
  selector: 'rqm-workspace',
  templateUrl: './rqmworkspace.component.html',
  styleUrls: ['./rqmworkspace.component.scss']
})
export class RQMWorkspaceComponent implements OnInit {
  @Input() name: string;
  @Input() workspaceId: number;
  @Input() workspaces: RQMWorkspace[];
  @Input() documents: RQMDocument[];

  constructor() {

  }

  ngOnInit() {
  }

}
