import { Component, Input } from '@angular/core';
import { connection } from 'src/app/models/connection';

@Component({
  selector: 'wf-start',
  templateUrl: './wf-start.component.html',
  styleUrls: ['./wf-start.component.scss']
})
export class WfStartComponent {   
      
   @Input() id?:number;
   @Input() showIO:boolean = false;


   constructor() { 
    
   }    
 
 
}
