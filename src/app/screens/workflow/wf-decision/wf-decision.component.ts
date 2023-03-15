import { Component, Input } from '@angular/core';

@Component({
  selector: 'wf-decision',
  templateUrl: './wf-decision.component.html',
  styleUrls: ['./wf-decision.component.scss']
})
export class WfDecisionComponent {
  @Input() id?:number;
  @Input() showIO:boolean = false;

}
