import { ContentChildren, Directive, ElementRef, EventEmitter, HostListener, Input, Output, QueryList, Renderer2, ViewChildren } from '@angular/core';
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

  @Input()
  connectedTo:DropiumDirective; 

  @Input()
  data:any;

  @ContentChildren(DragiumDirective) draggableElements = new QueryList<DragiumDirective>();

  private newIndex?:number = -1;
  private previousIndex?:number = -1;

  public previousContainer:DropiumDirective;
  public container:DropiumDirective;
  public Element:any;
 

  @Input() id: string = `dropium-id-${_uniqueId++}`;


  constructor(private renderer:Renderer2,private el:ElementRef) {  
     this.Element = el.nativeElement; 
     this.previousContainer = this;
     this.container = this;    
  }

  ngAfterContentInit() {

    this.draggableElements.forEach(dragInstance => {  

        dragInstance.ondrag.subscribe((dragEvent)=> {    
         

          if (dragEvent.isDragging){
                  

                    const dragInstanceClientrect = dragInstance.Element.getBoundingClientRect();

                    this.previousIndex = this.draggableElements.toArray().indexOf(dragInstance);

                    if (this.connectedTo &&  isInsideClientRect(this.connectedTo.Element.getBoundingClientRect(), dragInstanceClientrect.left,dragInstanceClientrect.top))
                    { 
                      this.container = this.connectedTo

                      const item = this.connectedTo.draggableElements.toArray()
                                        .find(a=> a.Element.getBoundingClientRect().top > dragInstanceClientrect.top);

                      this.newIndex = this.connectedTo.draggableElements.toArray()
                                          .sort((a,b) => a.Element.getBoundingClientRect().top - b.Element.getBoundingClientRect().top)
                                          .indexOf(item)

                      this.newIndex = this.newIndex == -1 ? this.connectedTo.draggableElements.length  : this.newIndex;             

                    } else {
                      this.container = this;

                      const item = this.draggableElements.toArray().find(item => item == dragInstance);

                      this.newIndex = this.draggableElements.toArray()
                                            .sort((a,b) => a.Element.getBoundingClientRect().top - b.Element.getBoundingClientRect().top)
                                            .indexOf(item);       
                    }           

                    if (dragInstance.placeHolder){  
                       console.log(dragInstance.placeHolder);
                    }

                    console.log(this.previousContainer.id+"-"+this.previousIndex+" -> "+this.container.id+"-"+this.newIndex);

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

  @HostListener('mouseup',['$event']) 
  onMouseUp(event:MouseEvent) {    
       this.dropped.emit({
          data: this.data,
          previousContainer: this.previousContainer,
          container :this.container, 
          previousIndex : this.previousIndex,
          newIndex : this.newIndex
       });         
  }

  @HostListener('window:mousemove',['$event'])
  onMouseMove(event:MouseEvent)
  {   
    const itemNew = this.draggableElements.toArray()[this.newIndex];      
    if (itemNew.placeHolder)
    {
        if (this.previousIndex != this.newIndex){
          const itemPrevious = this.draggableElements.toArray()[this.previousIndex];      
          this.renderer.removeStyle(itemPrevious.placeHolder?.elementRef?.nativeElement,"display");
        } else {      
          this.renderer.setStyle(itemNew.placeHolder?.elementRef?.nativeElement,"display","block");
          this.renderer.setStyle(itemNew.placeHolder?.elementRef?.nativeElement,"transform","translate3d(0px,0px,0px)");
        }
    }
  }
}
