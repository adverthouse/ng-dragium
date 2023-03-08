import { DOCUMENT } from '@angular/common';
import { AfterViewInit, ContentChild, Directive , ElementRef, EventEmitter, HostListener, Inject, Input, Output, ViewChild } from '@angular/core';
import { isInsideClientRect } from './core/dragium-utils';
import { DragiumHandleDirective } from './dragium-handle.directive'; 
import { DragiumPlaceholderDirective } from './dragium-placeholder.directive'; 
import { dragEvent } from './events/drag-events';


@Directive({
  selector: '[appDragium]'
})
export class DragiumDirective implements AfterViewInit {

  @ContentChild(DragiumHandleDirective) handle?: DragiumHandleDirective;
  @ContentChild(DragiumPlaceholderDirective) placeHolder?: DragiumPlaceholderDirective;


  @Output() 
  public ondrag = new EventEmitter<dragEvent>();
  private _isDragging:Boolean = false;

  @Input() returnInitialPosition:boolean = true;
  @Input() target:string = '';
  @Input() dragDirection:string = 'both';
  @Input() positionX:number = 0;
  @Input() positionY:number = 0; 
  @Input() isSelected:boolean = false;
  @Input() showPlaceholder:boolean = false;
  @Input() Id:any;
  @Input() boundary?;

  private _startX:number = 0;
  private _startY:number = 0;


  public Element:any;
  
  private _handleElement?: HTMLElement;
  private _draggingBoundaryElement?:any;

  constructor(@Inject(DOCUMENT) private document:any, private elementRef: ElementRef) {        
    this.Element = this.elementRef.nativeElement as HTMLElement;      
  }

  ngAfterViewInit(){        
    if (this.boundary){
       this._draggingBoundaryElement = (this.document as Document).querySelector(this.boundary);
    }

 

    this._handleElement = this.handle?.elementRef?.nativeElement || this.Element;

    this._startX = this.positionX;
    this._startY = this.positionY;

    this.elementRef.nativeElement.setAttribute('style',`transform: translate3d(${this.positionX}px,${this.positionY}px,0px)`);
  }

  @HostListener('mousedown',['$event'])
  onMouseDown(event:MouseEvent)
  {        
      event.preventDefault();   

      if (!isInsideClientRect(this._handleElement.getBoundingClientRect(), event.clientX,event.clientY)) return

      if (!this._isDragging) {

        this._isDragging = true; 

        this._startX = event.clientX - this.positionX;
        this._startY = event.clientY - this.positionY;
        
        this.Element.classList.add('dragging');

        this.ondrag.emit({
            isDragging : this._isDragging,
            positionX : this.positionX,
            positionY : this.positionY 
        });

      
      }      
  }

  @HostListener('window:mouseup',['$event']) 
  onMouseUp(event:MouseEvent) {  
    if (this.returnInitialPosition)
          this.elementRef.nativeElement.setAttribute('style',"");  
     
    this._isDragging = false;     

    if (this.returnInitialPosition)
    { 
       this.positionX = 0;
       this.positionY = 0;
    }

    this.Element.classList.remove('dragging');

    this.ondrag.emit({
      isDragging : this._isDragging ,
      positionX : this.positionX,
      positionY : this.positionY 
  });   
  }

  @HostListener("click")
  click(){
     this.isSelected = !this.isSelected;
  }

  @HostListener('window:mousemove',['$event'])
  onMouseMove(event:MouseEvent)
  {    
    if (this._isDragging){ 
      
      let finalX = event.clientX - this._startX;
      let finalY = event.clientY - this._startY;

      if (this._draggingBoundaryElement){
          const minBoundX = this._draggingBoundaryElement.offsetLeft;
          const minBoundY = this._draggingBoundaryElement.offsetTop;
          const maxBoundX = minBoundX + this._draggingBoundaryElement.offsetWidth - this.Element.offsetWidth;
          const maxBoundY = minBoundY +this._draggingBoundaryElement.offsetHeight - this.Element.offsetHeight;   

          finalX = Math.max(minBoundX, Math.min(finalX, maxBoundX));
          finalY = Math.max(minBoundY, Math.min(finalY, maxBoundY));
      }  

      if (this.dragDirection == 'horizontal' || this.dragDirection == 'both') this.positionX = finalX; 
      if (this.dragDirection == 'vertical' || this.dragDirection == 'both') this.positionY = finalY;

      this.ondrag.emit({
        isDragging : true,
        positionX : this.positionX,
        positionY : this.positionY 
     });

 
      this.elementRef.nativeElement.setAttribute('style',`touch-action:none;
        -webkit-user-drag: none;
        -webkit-tap-highlight-color:transparent;
        user-select: none; 
        z-index:15000;
        position:relative;
        transform: translate3d(${this.positionX}px,${this.positionY}px,0px)`);
    }
  }
}
