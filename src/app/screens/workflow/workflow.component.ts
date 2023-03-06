import { Component } from '@angular/core';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss']
})
export class WorkflowComponent {

  scale:number = 1;

  get(x,y,x2,y2){
    let sX = (x+60);
    let sY= (y+120)

    let fX = (x2+60);
    let fY = (y2);

    let diffX = (fX-sX) / 3;
    let diffY = (fY-sY) / 3;

    let mX = sX + diffX;
    let mY = sY + diffY;

    let zX = mX + diffX;
    let zY = mY + diffY;

    //centerX = ((sX+fX) / 2) - 15;
    //centerY = ((sY+fY) / 2) - 15;

    return `M ${sX} ${sY} C ${mX} ${mY}  ${zX} ${zY} ${fX} ${fY}`;
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
