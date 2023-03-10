import { DOCUMENT } from '@angular/common';
import { ContentChildren, Directive, ElementRef, EventEmitter, HostListener, Inject, Input, Output, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { isInsideClientRect } from './core/dragium-utils';
import { DragiumDirective } from './dragium.directive';
import { dropEvent } from './events/drop-events';

let _uniqueId = 0;

@Directive({
  selector: '[appDropium]',
  exportAs: 'appDropium',
  host: {
    '[attr.id]':'id'
  }
})
export class DropiumDirective {

  @Output()
  public dropped = new EventEmitter<dropEvent>();

  @Input() connectedTo:DropiumDirective; 
  @Input() data:any;

  @ContentChildren(DragiumDirective) draggableElements = new QueryList<DragiumDirective>();

  private newIndex?:number = -1;
  private previousIndex?:number = -1;

  public previousContainer:DropiumDirective;
  public container:DropiumDirective;
  public Element:HTMLElement;
 
  private draggingElementX:number = 0;
  private draggingElementY:number = 0;


  @Input() id: string = `dropium-id-${_uniqueId++}`;


  constructor(@Inject(DOCUMENT) private document:any,private renderer:Renderer2,private el:ElementRef) {  
     this.Element = el.nativeElement; 
     this.previousContainer = this;
     this.container = this;    
  }

  ngAfterContentInit() {    

    this.draggableElements.forEach(dragInstance => {  

        dragInstance.ondrag.subscribe((dragEvent)=> {             

          if (dragEvent.isDragging)
          { 
                    const dragInstanceClientrect = dragInstance.Element.getBoundingClientRect();

                    this.draggingElementX = dragInstanceClientrect.x;
                    this.draggingElementY = dragInstanceClientrect.y;

                    this.previousIndex = this.draggableElements.toArray().indexOf(dragInstance);
                    this.newIndex = this.previousIndex; 

                    if (this.connectedTo &&  isInsideClientRect(this.connectedTo.Element.getBoundingClientRect(), dragInstanceClientrect.left,dragInstanceClientrect.top))
                    { 
                      this.container = this.connectedTo

                      const item = this.connectedTo.draggableElements.toArray()
                                        .find(a=> a.Element.getBoundingClientRect().top > dragInstanceClientrect.top);

                      this.newIndex = this.connectedTo.draggableElements.toArray()
                                          .sort((a,b) => a.Element.getBoundingClientRect().top - b.Element.getBoundingClientRect().top)
                                          .indexOf(item);

                    } else {
                      this.container = this;

                      const item = this.draggableElements.toArray().find(item => item == dragInstance);

                      this.newIndex = this.draggableElements.toArray()
                                            .sort((a,b) => a.Element.getBoundingClientRect().top - b.Element.getBoundingClientRect().top)
                                            .indexOf(item);       
                    }   
               
          } 
        });
    });

    
    
  }

  @HostListener('mousedown',['$event'])
  onMouseDown(event:MouseEvent)
  {        
      event.preventDefault();   
      this.previousIndex = -1;
      this.newIndex = -1;
  } 

  @HostListener('window:mouseup',['$event']) 
  onMouseUp(event:MouseEvent) {         

       this.dropped.emit({
          data: this.data,
          previousContainer: this.previousContainer,
          container :this.container, 
          previousIndex : this.previousIndex,
          newIndex : this.newIndex,
          dropPositionX: this.draggingElementX,
          dropPositionY: this.draggingElementY
       });         
  }

  @HostListener('window:mousemove',['$event'])
  onMouseMove(event:MouseEvent)
  {   

    
  }
}
