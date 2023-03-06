import { Component, OnInit } from '@angular/core';
import { moveItemInArray } from 'src/app/directives/core/dragium-utils';
import { dropEvent } from 'src/app/directives/events/drop-events';

@Component({
  selector: 'app-basic-list',
  templateUrl: './basic-list.component.html',
  styleUrls: ['./basic-list.component.scss']
})
export class BasicListComponent implements OnInit {

  items:string[] = ["Item 1", "Item 2","Item 3"];

  constructor() { }

  ngOnInit(): void {
  }

  dropped(event:dropEvent){
    moveItemInArray(this.items,event.previousIndex,event.newIndex);     
  }
}
