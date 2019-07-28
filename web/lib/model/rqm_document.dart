import 'dart:html';

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

  Element buildWorkspaceOverviewElement() {
    LIElement thisElement = LIElement();
    ButtonElement btn = ButtonElement()..text = '$name';
    btn.onClick.listen((event) => showDocument(event));
    btn.className = 'workspaceTreeDocument';
    thisElement.children.add(btn);
    return thisElement;
  }

  void showDocument(MouseEvent envent) {
    window.open('document.html?id=$internalIdentifier&name=$name', name, '');
  }
}
