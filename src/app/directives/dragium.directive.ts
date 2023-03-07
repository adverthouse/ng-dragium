import { ContentChild, Directive , ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { DragiumPlaceholderDirective, DRAGIUM_PLACEHOLDER } from './dragium-placeholder.directive';
import { dragEvent } from './events/drag-events';


@Directive({
  selector: '[appDragium]'
})
export class DragiumDirective {

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

  private startX:number = 0;
  private startY:number = 0;

  public Element:any;

  constructor(private el: ElementRef) {        
    this.Element = this.el.nativeElement;        
  }

  ngOnInit(){        

    if (this.positionX != 0 || this.positionY != 0 )   
    {  
      this.startX = this.positionX;
      this.startY = this.positionY;

      this.el.nativeElement.setAttribute('style',`transform: translate3d(${this.positionX}px,${this.positionY}px,0px)`);
    }
  }

  @HostListener('mousedown',['$event'])
  onMouseDown(event:MouseEvent)
  {        
      event.preventDefault(); 

      if (!this._isDragging) {
        this._isDragging = true; 

        this.ondrag.emit({
            isDragging : this._isDragging,
            pageX : event.pageX,
            pageY : event.pageY 
        });

        this.startX = event.clientX;
        this.startY = event.clientY; 

        if (this.returnInitialPosition)
        { 
           this.positionX = 0;
           this.positionY = 0;
        }
      }      
  }

  @HostListener('window:mouseup',['$event']) 
  onMouseUp(event:MouseEvent) {  
    if (this.returnInitialPosition)
          this.el.nativeElement.setAttribute('style',"");  
     
    this._isDragging = false;     
    this.ondrag.emit({
      isDragging : this._isDragging ,
      pageX : event.pageX,
      pageY : event.pageY 
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
      this.ondrag.emit({
          isDragging : true,
          pageX : event.pageX,
          pageY : event.pageY 
      });


      let diffX = event.clientX - this.startX;
      let diffY = event.clientY - this.startY;     

      this.startX = event.clientX;
      this.startY = event.clientY;

      this.positionX = Number(this.positionX);
      this.positionY = Number(this.positionY);

      
      if (this.dragDirection == 'horizontal' || this.dragDirection == 'both') this.positionX += Number(diffX); 
      if (this.dragDirection == 'vertical' || this.dragDirection == 'both') this.positionY += Number(diffY);

 
      this.el.nativeElement.setAttribute('style',`touch-action:none;
        -webkit-user-drag: none;
        -webkit-tap-highlight-color:transparent;
        user-select: none; 
        z-index:15000;
        transform: translate3d(${this.positionX}px,${this.positionY}px,0px)`);
    }
  }
}
