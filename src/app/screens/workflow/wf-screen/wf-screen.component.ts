import { Component, Input } from '@angular/core';
import { connection } from 'src/app/models/connection';

@Component({
  selector: 'wf-screen',
  templateUrl: './wf-screen.component.html',
  styleUrls: ['./wf-screen.component.scss']
})
export class WfDecisionComponent {

   input:connection;
   outputs:connection[] = [];

   @Input() id:number;
   @Input() showIO:boolean = false;
}
