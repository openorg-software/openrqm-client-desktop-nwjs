/*
openrqm-client-desktop-nwjs
RQMDocumentComponent class
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/
import 'package:angular/angular.dart';
import 'package:angular_router/angular_router.dart';

import 'package:angular_components/angular_components.dart';
import 'package:angular_components/material_button/material_button.dart';

import 'package:openrqm_client_desktop_nwjs/utilities/rqm_route_paths.dart';
import 'package:openrqm_client_desktop_nwjs/utilities/rqm_routes.dart';

@Component(
  selector: 'rqm-document',
  template: '''
    <material-button [raised]="true" [routerLink]="RQMRoutePaths.documentViewer.toUrl()" [routerLinkActive]="'active'">{{name}}</material-button>
    ''',
  directives: [
    coreDirectives,
    routerDirectives,
    MaterialButtonComponent,
    RQMRoutePaths,
    RQMRoutes,
  ],
  exports: [
    RQMRoutePaths,
    RQMRoutes,
  ],
)
class RQMDocumentComponent {
  int workspaceId;
  int internalIdentifier;
  String externalIdentifier;
  @Input()
  String name;
  String description;
  String confidentiality;
  int authorId;
  int languageId;
  int approverId;
  String reviewerText;
  int lastModifiedById;
  DateTime lastModifiedOn;
  int baselineMajor;
  int baselineMinor;
  int baselineReview;
  int previousBaseline;

  RQMDocumentComponent({
    this.workspaceId,
    this.internalIdentifier,
    this.externalIdentifier,
    this.name,
    this.description,
    this.confidentiality,
    this.authorId,
    this.languageId,
    this.approverId,
    this.reviewerText,
    this.lastModifiedById,
    this.lastModifiedOn,
    this.baselineMajor,
    this.baselineMinor,
    this.baselineReview,
    this.previousBaseline,
  });
}
