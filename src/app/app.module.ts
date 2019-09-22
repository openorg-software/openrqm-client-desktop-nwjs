import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RQMWorkspaceTreeComponent } from './rqmworkspace-tree/rqmworkspace-tree.component';
import { RQMMenubarWorkspacesComponent } from './rqmmenubar-workspaces/rqmmenubar-workspaces.component';
import { RQMMainComponent } from './rqmmain/rqmmain.component';
import { RQMDocumentViewerComponent } from './rqmdocument-viewer/rqmdocument-viewer.component';
import { RQMWorkspaceComponent } from './rqmworkspace/rqmworkspace.component';
import { RQMDocumentComponent } from './rqmdocument/rqmdocument.component';

import { HttpClientModule } from '@angular/common/http';
import { ApiModule, BASE_PATH } from 'openrqm-api';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RQMSettingsComponent } from './rqmsettings/rqmsettings.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatTree, MatTreeModule } from '@angular/material/tree';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatProgressBar, MatProgressBarModule } from '@angular/material/progress-bar';
@NgModule({
  declarations: [
    AppComponent,
    RQMWorkspaceTreeComponent,
    RQMMenubarWorkspacesComponent,
    RQMMainComponent,
    RQMDocumentViewerComponent,
    RQMWorkspaceComponent,
    RQMDocumentComponent,
    RQMSettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ApiModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatTreeModule,
    MatIconModule,
    MatProgressBarModule
  ],
  providers: [{ provide: BASE_PATH, useValue: environment.API_BASE_PATH }],
  bootstrap: [AppComponent]
})
export class AppModule { }
