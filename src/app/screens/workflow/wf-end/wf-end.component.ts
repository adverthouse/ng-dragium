import { Component, Input } from '@angular/core';

@Component({
  selector: 'wf-end',
  templateUrl: './wf-end.component.html',
  styleUrls: ['./wf-end.component.scss']
})
export class WfEndComponent {
  
  @Input() id?:number;
  @Input() showIO:boolean = false;

}
