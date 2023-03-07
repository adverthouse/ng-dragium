import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item-connection',
  templateUrl: './item-connection.component.html',
  styleUrls: ['./item-connection.component.scss']
})
export class ItemConnectionComponent {

  @Input() x1:number;
  @Input() x2:number;
  @Input() y1:number;
  @Input() y2:number;

  width:number = 0;
  height:number = 0;

  get(){
    this.width = this.x2-this.x1;
    this.height = this.y2-this.y1;

    const curveWH:number = 30

    let p1x = this.x1;
    let p1y:number = this.y1 + (((this.y2-this.y1) /2) + curveWH)

    let p2x = ((this.x2-this.x1) - curveWH*2);
    let p2y = (this.y2-this.y1) / 2


    return `M ${this.x1} ${this.y1} L ${p1x} ${p1y}  Q${p1x} ${p1y + curveWH},${p1x + curveWH } ${p1y + curveWH}  L ${p2x} ${p2y}`;
  }


}
