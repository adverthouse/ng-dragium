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
   } 
 

  pathExpression()
  {
    
    const input = this.flowElements.find(a => a.id == this.connection.inputId);
    const output = this.flowElements.find(a => a.id == this.connection.outputId);
    
    let x1 = output.positionX+30;
    let y1 = output.positionY+60;
    
    let x4 = input.positionX-5;
    let y4 = input.positionY+30;

    let bezierWeight = 0.675;

    let dx = Math.abs(x4 - x1) * bezierWeight;
  
    let x2 = x1 - dx;
    let x3 = x4 + dx;
    
    let data = `M${x1} ${y1} C ${x2} ${y1} ${x3} ${y4} ${x4} ${y4}`;

    return data;
   }
}
