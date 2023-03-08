import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDragiumPlaceholder]'
})
export class DragiumPlaceholderDirective{

  constructor(public elementRef: ElementRef<HTMLElement>)
  { 
  
  }


}
