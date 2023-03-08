import { Component, OnInit } from '@angular/core';
import { moveItemInArray, transferArrayItem } from 'src/app/directives/core/dragium-utils';
import { dropEvent } from 'src/app/directives/events/drop-events';

@Component({
  selector: 'app-connected-list',
  templateUrl: './connected-list.component.html',
  styleUrls: ['./connected-list.component.scss']
})
export class ConnectedListComponent implements OnInit {

  itemsSource:string[] = ["Item S 1", "Item S 2","Item S 3"];
  itemsTarget:string[] = ["Item T 1", "Item T 2","Item T 3"];

  constructor() { }

  ngOnInit(): void {
  }

  dropped(event:dropEvent){    
    if (event.previousContainer === event.container){
      moveItemInArray(event.data,event.previousIndex,event.newIndex);     
    } else {
      transferArrayItem(event.previousContainer.data,event.container.data,event.previousIndex,event.newIndex);
    }
  }

}
