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
  
  curveWH:number = 30;  

  PathExpression()
  {   
      let width = this.x2-this.x1;
      let height = this.y2-this.y1;

      let p1y = ((height / 2 ) - this.curveWH);
      let p2y = (height / 2 ); 
      let p3x = (width - this.curveWH); 
   
      let elementCenter = 32;  

     return `M ${elementCenter} 2 L ${elementCenter} ${p1y} Q ${elementCenter} ${p1y + this.curveWH   },${this.curveWH + elementCenter} ${p2y}  L ${p3x} ${p2y} Q ${width} ${p2y},${width} ${p2y + this.curveWH } L ${width} ${height}`;
  } 
}
