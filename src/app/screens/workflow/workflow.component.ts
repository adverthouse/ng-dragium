import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { dragEvent } from 'src/app/directives/events/drag-events';
import { dropEvent } from 'src/app/directives/events/drop-events';
import { FlowElement } from 'src/app/models/flow-element';
import { ConnectionService } from 'src/app/services/connection.service';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss']
})
export class WorkflowComponent implements OnInit {

  @ViewChild("canvas") workflowCanvas:ElementRef;

  scale:number = 1;
  draggingItem:string = "";
  flowElements:FlowElement[] = [
    { id:1, type:"start",positionX: 80, positionY: 50},
   // { id:2, type:"connection", connection:{ inputId:3, outputId: 1}} ,
    //{ id:7, type:"end",positionX: 60, positionY: 550},
    { id:3, type:"screen",positionX: 250, positionY: 250},
    //{ id:4, type:"connection", connection:{ inputId:3, outputId: 5}} ,
    //{ id:5, type:"assignment",positionX: 370, positionY: 420},
    //{ id:6, type:"decision",positionX: 60, positionY: 450},        
  ]
  
  private checkPointFull:boolean = false;

  constructor(private connectionService:ConnectionService){

  }

  ngOnInit():void 
  {
     this.connectionService.currentConnecion.subscribe((currentConnecion) => {      
         if (currentConnecion.inputId !=0 && currentConnecion.outputId !=0)
         {
            if (this.checkPointFull) return;

            this.checkPointFull = true;

            if (this.flowElements.filter(a=>a.connection)
                                 .some(a=> a.connection.inputId == currentConnecion.inputId &&
                                           a.connection.outputId == currentConnecion.outputId) == false){
               const newId = this.flowElements.length + 1;                        
               this.flowElements.push({ id:newId, type:"connection", connection:currentConnecion });
               console.log(this.flowElements);
            } 

            this.checkPointFull = false;
         }
     });
  }
 

  flowItemDrag(event:dragEvent){          
      this.draggingItem = event.isDragging ? event.data : "";
  }

  dropped(event:dropEvent){
   
     if (event.previousContainer != event.container){
       this.connectionService.reset();
       
       if (event.data != ''){
          const coords = this.workflowCanvas.nativeElement.getBoundingClientRect();
          let newId:number = 1;
          if (this.flowElements.length != 0) newId++;         
          this.flowElements.push({ id: newId, type :event.data, positionX:event.dropPositionX - coords.left ,positionY : event.dropPositionY - coords.top });        
       }
     }
  }

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
