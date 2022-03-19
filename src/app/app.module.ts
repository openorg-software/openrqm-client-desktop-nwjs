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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { A11yModule } from '@angular/cdk/a11y';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';


/// For workspace-tree
import { TreeviewModule } from 'ngx-treeview';
import { RQMWorkspaceTreeComponent } from './rqmworkspace-tree/rqmworkspace-tree.component';
import { RQMMainComponent } from './rqmmain/rqmmain.component';
import { RQMWorkspaceTreeviewComponent } from './rqmworkspace-treeview/rqmworkspace-treeview.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    BrowserAnimationsModule,
    CKEditorModule,
    MaterialFileInputModule,
    ReactiveFormsModule,
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
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
