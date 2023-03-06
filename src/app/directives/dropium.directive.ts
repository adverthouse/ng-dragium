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

  @ContentChildren(DragiumDirective) draggableElements = new QueryList<DragiumDirective>();

  private newIndex?:number;
  private previousIndex?:number;

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
        dragInstance.returnInitialPosition = true;

        dragInstance.dragging.subscribe((isDragging)=> {            
          if (isDragging){

            const dragInstanceClientrect =  dragInstance.Element.getBoundingClientRect();

            this.previousIndex = this.draggableElements.toArray().indexOf(dragInstance);
        

            if (this.connectedTo && 
              isInsideClientRect(this.connectedTo.Element.getBoundingClientRect(),
              dragInstanceClientrect.left,dragInstanceClientrect.top))
               // todo on it is enough
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

               const item = this.draggableElements.toArray()
                                .find(a=>
                                   a.Element.getBoundingClientRect().top >
                                    dragInstanceClientrect.top);
         
                 this.newIndex = this.draggableElements.toArray()
                                     .sort((a,b) => a.Element.getBoundingClientRect().top - b.Element.getBoundingClientRect().top)
                                     .indexOf(item);

               this.newIndex = this.newIndex == -1 ? this.draggableElements.length : this.newIndex;         
            } 

           


          }
        });
    });

    
    
  }

  @HostListener('mousedown',['$event'])
  onMouseDown(event:MouseEvent)
  {        
      event.preventDefault();   
  } 

  @HostListener('mouseup',['$event']) 
  onMouseUp(event:MouseEvent) {       
      
       
       this.dropped.emit({
          previousContainer: this.previousContainer,
          container :this.container, 
          previousIndex : this.previousIndex,
          newIndex : this.newIndex
       });         
  }

  @HostListener('window:mousemove',['$event'])
  onMouseMove(event:MouseEvent)
  {
    
  }
}
