import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RQMWorkspaceTreeComponent } from './rqmworkspace-tree/rqmworkspace-tree.component';
import { RQMDocumentViewerComponent } from './rqmdocument-viewer/rqmdocument-viewer.component';


const routes: Routes = [
  { path: 'workspace-tree', component: RQMWorkspaceTreeComponent },
  { path: 'document-viewer', component: RQMDocumentViewerComponent },
  { path: '', redirectTo: '/workspace-tree', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
