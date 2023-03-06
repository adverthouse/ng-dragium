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
    WorkflowComponent
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
