/*
openrqm-client-desktop-nwjs
App Modules
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 - 2020 Benjamin Schilling
*/


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

/// Design
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RQMMaterialModule } from './material-module'


/// For workspace-tree
import { TreeviewModule } from 'ngx-treeview';
import { RQMWorkspaceTreeComponent } from './rqmworkspace-tree/rqmworkspace-tree.component';
import { RQMMainComponent } from './rqmmain/rqmmain.component';
import { RQMWorkspaceTreeviewComponent } from './rqmworkspace-treeview/rqmworkspace-treeview.component';
import { FormsModule } from '@angular/forms';

/// For document-viewer
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

/// File upload
import { MaterialFileInputModule } from 'ngx-material-file-input'


/// For OpenRQM API
import { ApiModule } from 'openrqm-api';
import { HttpClientModule } from '@angular/common/http';
import { RQMWorkspaceMenubarComponent } from './rqmworkspace-menubar/rqmworkspace-menubar.component';
import { RQMDocumentViewerComponent } from './rqmdocument-viewer/rqmdocument-viewer.component';
import { RQMDocumentMenubarComponent } from './rqmdocument-menubar/rqmdocument-menubar.component';
import { RQMServerSettingsDialogComponent } from './rqmserver-settings-dialog/rqmserver-settings-dialog.component';
import { RQMAddWorkspaceComponent } from './rqmadd-workspace/rqmadd-workspace.component';
import { RQMAddDocumentComponent } from './rqmadd-document/rqmadd-document.component';
import { RQMTracingComponent } from './rqmtracing/rqmtracing.component';
import { RQMDocumentExporterComponent } from './rqmdocument-exporter/rqmdocument-exporter.component';
import { RQMWorkspaceTreeviewItemPropertiesDialogComponent } from './rqmworkspace-treeview-item-properties/rqmworkspace-treeview-item-properties-dialog.component';
import { RQMLoginComponent } from './rqmlogin/rqmlogin.component';
import { RQMRegisterComponent } from './rqmregister/rqmregister.component';
import { RQMUserSettingsDialogComponent } from './rqmuser-settings-dialog/rqmuser-settings-dialog.component';
import { RQMDocumentEditorComponent } from './rqmdocument-editor/rqmdocument-editor.component';
import { RQMDocumentThemeComponent } from './rqmdocument-theme/rqmdocument-theme.component';
import { RQMAccessControlListComponent } from './rqmaccess-control-list/rqmaccess-control-list.component';
import { RQMAssignUsersComponent } from './rqmassign-users/rqmassign-users.component';
import { RQMAssignAccessGroupComponent } from './rqmassign-access-group/rqmassign-access-group.component';
import { RQMDeleteTreeViewItemComponent } from './rqmdelete-tree-view-item/rqmdelete-tree-view-item.component';
import { RQMAddUserComponent } from './rqmadd-user/rqmadd-user.component';
import { RQMMultiLineSnackBarComponent } from './rqmmulti-line-snack-bar/rqmmulti-line-snack-bar.component';
import { RQMManageAccessGroupsComponent } from './rqmmanage-access-groups/rqmmanage-access-groups.component';
import { RQMDocumentImportDialogComponent } from './rqmdocument-import-dialog/rqmdocument-import-dialog.component';

@NgModule({
  declarations: [
    RQMWorkspaceTreeComponent,
    RQMMainComponent,
    RQMWorkspaceTreeviewComponent,
    RQMWorkspaceMenubarComponent,
    RQMDocumentViewerComponent,
    RQMDocumentMenubarComponent,
    RQMServerSettingsDialogComponent,
    RQMAddWorkspaceComponent,
    RQMAddDocumentComponent,
    RQMTracingComponent,
    RQMDocumentExporterComponent,
    RQMWorkspaceTreeviewItemPropertiesDialogComponent,
    RQMLoginComponent,
    RQMRegisterComponent,
    RQMUserSettingsDialogComponent,
    RQMDocumentEditorComponent,
    RQMDocumentThemeComponent,
    RQMAccessControlListComponent,
    RQMAssignUsersComponent,
    RQMAssignAccessGroupComponent,
    RQMDeleteTreeViewItemComponent,
    RQMAddUserComponent,
    RQMMultiLineSnackBarComponent,
    RQMManageAccessGroupsComponent,
    RQMDocumentImportDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TreeviewModule.forRoot(),
    FormsModule,
    FontAwesomeModule,
    ApiModule,
    HttpClientModule,
    NgbModule,
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule,
    RQMMaterialModule,
    CKEditorModule,
    MaterialFileInputModule,
  ],
  entryComponents: [
    RQMServerSettingsDialogComponent,
    RQMAddDocumentComponent,
    RQMAddWorkspaceComponent,
    RQMDocumentMenubarComponent,
    RQMWorkspaceTreeviewItemPropertiesDialogComponent,
    RQMUserSettingsDialogComponent,
    RQMDocumentExporterComponent,
    RQMDocumentThemeComponent,
    RQMRegisterComponent,
    RQMDeleteTreeViewItemComponent,
    RQMAddDocumentComponent,
    RQMAddUserComponent,
    RQMMultiLineSnackBarComponent,
    RQMManageAccessGroupsComponent,
    RQMDocumentImportDialogComponent,
  ],
  bootstrap: [RQMMainComponent]
})
export class AppModule { }
