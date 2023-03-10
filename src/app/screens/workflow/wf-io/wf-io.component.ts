import {  Component, ElementRef,  Input } from '@angular/core';
import { ConnectionService } from 'src/app/services/connection.service';

@Component({
  selector: 'wf-io',
  templateUrl: './wf-io.component.html',
  styleUrls: ['./wf-io.component.scss']
})
export class WfIoComponent {

   defaultColor:string = "#FFFFFF";
   activeColor:string = "#ff0000";

   @Input() connectionType:string;
   @Input() id:number;
   @Input() top:number = 50;
   @Input() left:number = 20;


   private _isDragging:boolean = false;
 
   fillColor:any = this.defaultColor;   
      
   constructor(private el:ElementRef,private connectionService:ConnectionService) {   
    console.log(this.connectionType+"."+this.id);
   }



   setIsDrag(newStatus:boolean){   
    
    this._isDragging = newStatus; 
    this.connectionService.changeIsDragging(newStatus);
    
    console.log(this.id+" is id");
    if (this.connectionType == "input") this.connectionService.changeInputId(this.id);
    if (this.connectionType == "output") this.connectionService.changeOutputId(this.id);
    
    // 3 ü birden dolu ise ok de ve bağla
    this.fillColor = this._isDragging ? this.activeColor : this.defaultColor;    
   }

   mousedown(event:MouseEvent){
      event.preventDefault();  
      this.setIsDrag(true);    
   }

   mousemove(event:MouseEvent)
   { 
    if (this._isDragging){
        console.log("move");
    }      
   }

   mouseup(event:MouseEvent){
      this.setIsDrag(false);
   }

  mouseover(event:MouseEvent)
  {
    this.fillColor = this.activeColor;     
  }

   mouseleave(event:MouseEvent){   
      if (!this._isDragging){
        this.fillColor = this.defaultColor;
      }
   }
}
