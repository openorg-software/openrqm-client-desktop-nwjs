import { Component } from '@angular/core';

@Component({
  selector: 'app-rqmelement-viewer',
  templateUrl: './rqmelement-viewer.component.html',
  styleUrls: ['./rqmelement-viewer.component.css']
})
export class RQMElementViewerComponent {
  model: {
    id: Number;
    content: String;
    type: Number;
    rank: String;
    parent: Number;
  };

  constructor() { }

}