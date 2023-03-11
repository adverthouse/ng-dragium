import { AfterViewInit, Component, Input } from '@angular/core';
import { connection } from 'src/app/models/connection';
import { FlowElement } from 'src/app/models/flow-element';

@Component({
  selector: 'wf-connection',
  templateUrl: './wf-connection.component.html',
  styleUrls: ['./wf-connection.component.scss']
})
export class WfConnectionComponent implements AfterViewInit   {
 
  @Input() connection?:connection;
  @Input() flowElements?:FlowElement[];
    
  width?:number;
  height?:number;

  positionX?:number;
  positionY?:number;

  ngAfterViewInit(){    
    const start = this.flowElements.find(a => a.id == this.connection.inputId);
    const end = this.flowElements.find(a => a.id == this.connection.outputId);

    this.positionX = end.positionX;
    this.positionY = end.positionY;

    this.width = end.positionX - start.positionX > 0 ? end.positionX - start.positionX : start.positionX - end.positionX;
    this.height = end.positionY - start.positionY > 0 ? end.positionY - start.positionY : start.positionY - end.positionY;
  } 
 

  pathExpression()
  {
    const start = this.flowElements.find(a => a.id == this.connection.inputId);
    const end = this.flowElements.find(a => a.id == this.connection.outputId);

    const curveWH = 30;  
    const elementCenter = 32;  

    let p1x = 30;
    let p1y = 60;

    let p2x =  start.positionX - end.positionX; 
    let p2y =  start.positionY - end.positionY ; 

    
   // return  `M${p1x} ${p1y} C${p1x} ${p1y} ${(p2x - p1x)/2} ${(p2y - p1y)/2} ${p2x} ${p2y}`
     return `M ${p1x} ${p1y} L ${p2x} ${p2y}`    
   }
}
