import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item-connection',
  templateUrl: './item-connection.component.html',
  styleUrls: ['./item-connection.component.scss']
})
export class ItemConnectionComponent {

  @Input() x1:number = 0;
  @Input() x2:number = 0;
  @Input() y1:number = 0;
  @Input() y2:number = 0;
  
  curveWH:number = 30

  width:number = 0;
  height:number = 0;

  PathExpression()
  {   
      this.width = this.x2-this.x1;
      this.height = this.y2-this.y1;

      let p1y = ((this.height / 2 ) - this.curveWH);
      let p2y = (this.height / 2 ); 
      let p3x = (this.width - this.curveWH); 

     return `M 2 2 L 2 ${p1y} Q 2 ${p1y + this.curveWH},${this.curveWH} ${p2y}  L ${p3x} ${p2y} Q ${this.width} ${p2y},${this.width} ${p2y + this.curveWH } L ${this.width} ${this.height}`;
  } 
}
