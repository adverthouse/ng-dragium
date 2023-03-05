import { ContentChildren, Directive, HostListener, QueryList, ViewChildren } from '@angular/core';
import { DragiumDirective } from './dragium.directive';

@Directive({
  selector: '[appDropium]'
})
export class DropiumDirective {

  @ContentChildren(DragiumDirective) draggableElements = new QueryList<DragiumDirective>();

  constructor() {  

  }

  ngAfterContentInit() {
    this.draggableElements.forEach(dragInstance => {
        dragInstance.returnInitialPosition = true;

        dragInstance.isDragging.subscribe((item)=> {
            console.log(item);
            console.log(dragInstance.positionX);
        });
    });

    
    
  }

  @HostListener('mousedown',['$event'])
  onMouseDown(event:MouseEvent)
  {        
      event.preventDefault();  
      
  }

  @HostListener('window:mouseup') 
  onMouseUp() { 
   
  }

  @HostListener('window:mousemove',['$event'])
  onMouseMove(event:MouseEvent)
  {
    
  }
}
