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
    { id:1, type:"start",positionX: 80, positionY: 50},
    { id:2, type:"connection", connection:{ inputId:1, outputId: 3}} ,
    { id:3, type:"screen",positionX: 250, positionY: 250},
    { id:4, type:"connection", connection:{ inputId:3, outputId: 5}} ,
    { id:5, type:"assignment",positionX: 370, positionY: 420},
    { id:6, type:"decision",positionX: 60, positionY: 450},    
    { id:7, type:"end",positionX: 60, positionY: 550},
  ]
  

  drag(event:dragEvent,flowElement:FlowElement){
    flowElement.positionX = event.positionX;
    flowElement.positionY = event.positionY;
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
