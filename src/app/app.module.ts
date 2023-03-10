import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragiumDirective } from './directives/dragium.directive';
import { HighlightDirective } from './directives/highlight.directive';

import { BasicDragComponent } from './screens/basic-drag/basic-drag.component';
import { OneDirectionOnlyComponent } from './screens/one-direction-only/one-direction-only.component';
import { DropiumDirective } from './directives/dropium.directive';
import { BasicListComponent } from './screens/basic-list/basic-list.component';
import { ConnectedListComponent } from './screens/connected-list/connected-list.component';
import { WorkflowComponent } from './screens/workflow/workflow.component';
import { KanbanComponent } from './screens/kanban/kanban.component';

import { DragiumHandleDirective } from './directives/dragium-handle.directive';
import { BasicDragWithHandleComponent } from './screens/basic-drag-with-handle/basic-drag-with-handle.component';
import { WfStartComponent } from './screens/workflow/wf-start/wf-start.component';
import { WfEndComponent } from './screens/workflow/wf-end/wf-end.component';
import { WfScreenComponent } from './screens/workflow/wf-decision/wf-decision.component';
import { WfDecisionComponent } from './screens/workflow/wf-screen/wf-screen.component';
import { WfAssignmentComponent } from './screens/workflow/wf-assignment/wf-assignment.component';
import { WfConnectionComponent } from './screens/workflow/wf-connection/wf-connection.component';
import { WfIoComponent } from './screens/workflow/wf-io/wf-io.component';


@NgModule({
  declarations: [
    AppComponent,
    DragiumDirective,
    HighlightDirective,
    BasicDragComponent,
    OneDirectionOnlyComponent,
    DropiumDirective,
    BasicListComponent,
    ConnectedListComponent,
    WorkflowComponent,
    KanbanComponent,
    DragiumHandleDirective,
    BasicDragWithHandleComponent,
    WfStartComponent,
    WfEndComponent,
    WfScreenComponent,
    WfDecisionComponent,
    WfAssignmentComponent,
    WfConnectionComponent,
    WfIoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
