part of swagger.api;

class Document {
  
  int id = null;
  

  int workspaceId = null;
  

  int internalIdentifier = null;
  

  int externalIdentifier = null;
  

  String name = null;
  

  String shortName = null;
  

  String description = null;
  

  String confidentiality = null;
  

  int authorId = null;
  

  int languageId = null;
  

  int approverId = null;
  

  String reviewerText = null;
  

  int lastModifiedById = null;
  

  DateTime lastModifiedOn = null;
  

  int baselineMajor = null;
  

  int baselineMinor = null;
  

  int baselineReview = null;
  

  int previousBaselineId = null;
  
  Document();

  @override
  String toString() {
    return 'Document[id=$id, workspaceId=$workspaceId, internalIdentifier=$internalIdentifier, externalIdentifier=$externalIdentifier, name=$name, shortName=$shortName, description=$description, confidentiality=$confidentiality, authorId=$authorId, languageId=$languageId, approverId=$approverId, reviewerText=$reviewerText, lastModifiedById=$lastModifiedById, lastModifiedOn=$lastModifiedOn, baselineMajor=$baselineMajor, baselineMinor=$baselineMinor, baselineReview=$baselineReview, previousBaselineId=$previousBaselineId, ]';
  }

  Document.fromJson(Map<String, dynamic> json) {
    if (json == null) return;
    id =
        json['id']
    ;
    workspaceId =
        json['workspaceId']
    ;
    internalIdentifier =
        json['internalIdentifier']
    ;
    externalIdentifier =
        json['externalIdentifier']
    ;
    name =
        json['name']
    ;
    shortName =
        json['shortName']
    ;
    description =
        json['description']
    ;
    confidentiality =
        json['confidentiality']
    ;
    authorId =
        json['authorId']
    ;
    languageId =
        json['languageId']
    ;
    approverId =
        json['approverId']
    ;
    reviewerText =
        json['reviewerText']
    ;
    lastModifiedById =
        json['lastModifiedById']
    ;
    lastModifiedOn = json['lastModifiedOn'] == null ? null : DateTime.parse(json['lastModifiedOn']);
    baselineMajor =
        json['baselineMajor']
    ;
    baselineMinor =
        json['baselineMinor']
    ;
    baselineReview =
        json['baselineReview']
    ;
    previousBaselineId =
        json['previousBaselineId']
    ;
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'workspaceId': workspaceId,
      'internalIdentifier': internalIdentifier,
      'externalIdentifier': externalIdentifier,
      'name': name,
      'shortName': shortName,
      'description': description,
      'confidentiality': confidentiality,
      'authorId': authorId,
      'languageId': languageId,
      'approverId': approverId,
      'reviewerText': reviewerText,
      'lastModifiedById': lastModifiedById,
      'lastModifiedOn': lastModifiedOn == null ? '' : lastModifiedOn.toUtc().toIso8601String(),
      'baselineMajor': baselineMajor,
      'baselineMinor': baselineMinor,
      'baselineReview': baselineReview,
      'previousBaselineId': previousBaselineId
     };
  }

  static List<Document> listFromJson(List<dynamic> json) {
    return json == null ? new List<Document>() : json.map((value) => new Document.fromJson(value)).toList();
  }

  static Map<String, Document> mapFromJson(Map<String, Map<String, dynamic>> json) {
    var map = new Map<String, Document>();
    if (json != null && json.length > 0) {
      json.forEach((String key, Map<String, dynamic> value) => map[key] = new Document.fromJson(value));
    }
    return map;
  }
}

