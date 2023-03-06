import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { BasicDragComponent } from './screens/basic-drag/basic-drag.component';
import { BasicListComponent } from './screens/basic-list/basic-list.component';
import { ConnectedListComponent } from './screens/connected-list/connected-list.component';
import { OneDirectionOnlyComponent } from './screens/one-direction-only/one-direction-only.component';
import { WorkflowComponent } from './screens/workflow/workflow.component';

const routes: Routes = [
  { path: '', component:WorkflowComponent,  pathMatch:'full' },
  { path: 'basic-drag', component:BasicDragComponent },
  { path: 'one-direction-only', component:OneDirectionOnlyComponent },
  { path: 'basic-list', component: BasicListComponent },
  { path: 'connected-list', component: ConnectedListComponent },
  { path: 'workflow', component: WorkflowComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
