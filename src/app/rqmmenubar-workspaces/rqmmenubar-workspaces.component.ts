import { Component, OnInit } from '@angular/core';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
@Component({
  selector: 'rqmmenubar-workspaces',
  templateUrl: './rqmmenubar-workspaces.component.html',
  styleUrls: ['./rqmmenubar-workspaces.component.scss']

})
export class RQMMenubarWorkspacesComponent implements OnInit {

  menuModel: Variable;
  menuLabelFile: string = "File";
  menuLabelEdit: string = "Edit";

  constructor() {

  }

  ngOnInit() {
  }

}
