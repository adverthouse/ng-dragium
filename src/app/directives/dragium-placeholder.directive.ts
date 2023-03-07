import { Directive, InjectionToken, TemplateRef } from '@angular/core';

export const DRAGIUM_PLACEHOLDER = new InjectionToken<DragiumPlaceholderDirective>('CdkDragPlaceholder');


@Directive({
  selector: 'ng-template[appDragiumPlaceholder]',
  providers: [{provide: DRAGIUM_PLACEHOLDER, useExisting: DragiumPlaceholderDirective}],
})
export class DragiumPlaceholderDirective {

  constructor() { 
    
  }

}
