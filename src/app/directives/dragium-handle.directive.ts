import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDragiumHandle]'
})
export class DragiumHandleDirective {

  constructor(public elementRef: ElementRef<HTMLElement>) {
 
  }

}
