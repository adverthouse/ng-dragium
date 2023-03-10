import { DOCUMENT } from '@angular/common';
import { AfterViewInit, ContentChild, Directive , ElementRef, EventEmitter, HostListener, Inject, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { DragiumConsts } from './core/dragium-consts';
import { isInsideClientRect } from './core/dragium-utils';
import { DragiumHandleDirective } from './dragium-handle.directive'; 
import { dragEvent } from './events/drag-events';

let _uniqueId = 0;

@Directive({
  selector: '[appDragium]'
})
export class DragiumDirective implements AfterViewInit {

  @ContentChild(DragiumHandleDirective) handle?: DragiumHandleDirective;

  @Output() 
  public ondrag = new EventEmitter<dragEvent>();
  private _isDragging:Boolean = false;
  private _isMoved:Boolean = false;

  @Input() returnInitialPosition:boolean = true;
  @Input() target:string = '';
  @Input() dragDirection:string = 'both';
  @Input() positionX:number = 0;
  @Input() positionY:number = 0; 

  @Input() isSelectable:boolean = true;
  @Input() isSelected:boolean = false;
  @Input() showPlaceholder:boolean = false;
  @Input() id: string = `dragium-id-${_uniqueId++}`;
  @Input() boundary?;
  @Input() data:any;

  private _startX:number = 0;
  private _startY:number = 0;


  private _width:any;
  private _height:any;  

  public Element:any;
  
  private _handleElement?: HTMLElement;
  private _draggingBoundaryElement?:any;

  constructor(@Inject(DOCUMENT) private document:any, private elementRef: ElementRef, private renderer:Renderer2) {        
    this.Element = this.elementRef.nativeElement as HTMLElement;   
    this.renderer.setAttribute(this.Element,"id",this.id);   
  }

  ngAfterViewInit(){        
    if (this.boundary){
       this._draggingBoundaryElement = (this.document as Document).querySelector(this.boundary);
    }

    this._handleElement = this.handle?.elementRef?.nativeElement || this.Element;

    this._startX = this.positionX;
    this._startY = this.positionY;

    this._width = this.Element.getBoundingClientRect().width;
    this._height = this.Element.getBoundingClientRect().height;

    if (this.positionX != 0 || this.positionY !=0){
      this.Element.setAttribute('style',`transform: translate3d(${this.positionX}px,${this.positionY}px,0px);position:absolute;z-index:1024;`);
    }
  }

  setStyle(initDiff:number){
    this.Element.setAttribute('style',`touch-action:none;
                                                        -webkit-user-drag: none;
                                                        -webkit-tap-highlight-color:transparent;
                                                        user-select: none; 
                                                        z-index:1024;
                                                        position:absolute;    
                                                        transform: translate3d(${this.positionX}px,${this.positionY - initDiff}px,0px)`);
  }

  setSelected(isSelected:boolean){
    if (this.isSelectable){
      this.isSelected = isSelected;
      if (this.isSelected)
          this.Element.classList.add(DragiumConsts.SELECTED);
      else 
          this.Element.classList.remove(DragiumConsts.SELECTED);
     }
  }

  @HostListener('mousedown',['$event'])
  onMouseDown(event:MouseEvent)
  {        
      event.preventDefault();   
      this._isMoved = false;

      if (!isInsideClientRect(this._handleElement.getBoundingClientRect(), event.clientX,event.clientY)) return

      if (!this._isDragging) {

        this._isDragging = true;  

        this._startX = event.clientX - this.positionX;
        this._startY = event.clientY - this.positionY;
        
        this.Element.classList.add(DragiumConsts.DRAGGING);
        this.setStyle(0);

        this.ondrag.emit({
            isDragging : this._isDragging,
            data: this.data,
            positionX : this.positionX,
            positionY : this.positionY 
        });      
      }      
  }

  @HostListener('window:mouseup',['$event']) 
  onMouseUp(event:MouseEvent) {  

    if (isInsideClientRect(this.Element.getBoundingClientRect(),event.pageX,event.pageY)) {
        if (this._isMoved){
          this.setSelected(false);
        } else {
          this.setSelected(!this.isSelected);
        }
    }

    if (this.returnInitialPosition)
          this.elementRef.nativeElement.setAttribute('style',"");  
     
    this._isDragging = false;     
    this.Element.classList.remove(DragiumConsts.DRAGGING); 
   
    if (this.returnInitialPosition)
    { 
       this.positionX = 0;
       this.positionY = 0;
    }

    this.ondrag.emit({
      isDragging : this._isDragging,
      data: this.data,
      positionX : this.positionX,
      positionY : this.positionY 
    });    
    this._isMoved = false;
  }

  @HostListener("click",['$event'])
  click(event:MouseEvent){    

  }

  @HostListener('window:mousemove',['$event'])
  onMouseMove(event:MouseEvent)
  {   
    if (this._isDragging){ 
      
      this._isMoved = true;

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
     
      this.setStyle(0); 

      this.ondrag.emit({
        isDragging : true,
        data :this.data,
        positionX : this.positionX,
        positionY : this.positionY 
     });
    }
  }
}
