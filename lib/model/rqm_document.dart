/*
openrqm-client-desktop-nwjs
RQMDocument class
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/
class RQMDocument {
  int workspaceId;
  int internalIdentifier;
  String externalIdentifier;
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

  RQMDocument({
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
