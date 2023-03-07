import { Component } from '@angular/core';
import { KanbanList } from '../../models/kanban/kanban-list'
import { Card } from '../../models/kanban/card'
import { StuffByCard } from '../../models/kanban/stuff-by-card'

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent {
    
     kanbanLists:KanbanList[] = [
        {ListId:1, DepartmentId:1, ListName:"To do",ListDescription: "", Cards: [
          { CardId:1, CardOrder:1, CardSummary:"This is first work",CardDescription:"", StuffsByCard:[{ STId: 1, StuffId :1 }] },
          { CardId:2, CardOrder:2, CardSummary:"Another card",CardDescription:"", StuffsByCard:[{ STId: 1, StuffId :1 }] },
          { CardId:3, CardOrder:3, CardSummary:"Great View",CardDescription:"", StuffsByCard:[{ STId: 1, StuffId :1 }] },
        ]},
        {ListId:2, DepartmentId:1, ListName:"To do",ListDescription: "", Cards: [
          { CardId:4, CardOrder:1, CardSummary:"This is first work",CardDescription:"", StuffsByCard:[{ STId: 1, StuffId :1 }] },
          { CardId:5, CardOrder:2, CardSummary:"Another card",CardDescription:"", StuffsByCard:[{ STId: 1, StuffId :1 }] },          
        ]}
     ];
 
    
}
