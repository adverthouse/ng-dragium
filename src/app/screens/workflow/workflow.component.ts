import { Component } from '@angular/core';
import { dragEvent } from 'src/app/directives/events/drag-events';
import { FlowElement } from 'src/app/models/flow-element';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss']
})
export class WorkflowComponent {

  scale:number = 1;
  flowElements:FlowElement[] = [
    { id:1, type:"start",positionX: 60, positionY: 150},
    { id:2, type:"connection",positionX: 60, positionY: 150},
  ]
  

  drag(event:dragEvent){
    console.log(event);
  }

  zoomIn(){
    this.scale = this.scale + 0.1;
  }
  

  zoomOut(){
    this.scale = this.scale - 0.1;
  }

  zoomReset(){
    this.scale = 1;
  }

}
