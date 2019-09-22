import { Component, OnInit, Input } from '@angular/core';
import { MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'rqm-document',
  templateUrl: './rqmdocument.component.html',
  styleUrls: ['./rqmdocument.component.scss']
})
export class RQMDocumentComponent implements OnInit {

  @Input() name: string;
  constructor() { }

  ngOnInit() {
  }

}
