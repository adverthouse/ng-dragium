import { Directive , ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';


@Directive({
  selector: '[appDragium]'
})
export class DragiumDirective {

  @Output() 
  public dragging = new EventEmitter<Boolean>();
  private _isDragging:Boolean = false;

  @Input() returnInitialPosition:boolean = false;
  @Input() target:string = '';
  @Input() dragDirection:string = 'both';
  @Input() positionX:any = 0;
  @Input() positionY:any = 0; 
  @Input() Id:any;

  private startX:any = 0;
  private startY:any = 0;

  public Element:any;
  private _preStyle:string = ''; 
  

  constructor(private el: ElementRef) {        
    this.Element = this.el.nativeElement;
  }

  ngOnInit(){    
    this._preStyle = this.el.nativeElement.getAttribute('style') || "";    
  }

  @HostListener('mousedown',['$event'])
  onMouseDown(event:MouseEvent)
  {        
      event.preventDefault(); 

      if (!this._isDragging) {
        this._isDragging = true; 
        this.dragging.emit(true);

        this.startX = event.clientX;
        this.startY = event.clientY; 

        if (this.returnInitialPosition)
        {
           this.positionX = 0;
           this.positionY = 0;
        }
      }      
  }

  @HostListener('window:mouseup') 
  onMouseUp() {  
    this._isDragging = false;     
    this.dragging.emit(false);
    if (this.returnInitialPosition)
       this.el.nativeElement.setAttribute('style',this._preStyle);  
  }

  @HostListener('window:mousemove',['$event'])
  onMouseMove(event:MouseEvent)
  {
    if (this._isDragging){ 
      this.dragging.emit(true);

      let diffX = event.clientX - this.startX;
      let diffY = event.clientY - this.startY;
      
      this.startX = event.clientX;
      this.startY = event.clientY;

      
      if (this.dragDirection == 'horizontal' || this.dragDirection == 'both') this.positionX += diffX; 
      if (this.dragDirection == 'vertical' || this.dragDirection == 'both') this.positionY += diffY;

      this.el.nativeElement.setAttribute('style',this._preStyle +`touch-action:none;
        -webkit-user-drag: none;
        -webkit-tap-highlight-color:transparent;
        user-select: none; 
        z-index:15000;
        transform: translate3d(${this.positionX}px,${this.positionY}px,0px)`);
    }
  }
}
