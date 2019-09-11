part of swagger.api;

class Element {
  
  int id = null;
  

  int documentId = null;
  

  int elementTypeId = null;
  

  String content = null;
  

  String rank = null;
  

  int parentElementId = null;
  
  Element();

  @override
  String toString() {
    return 'Element[id=$id, documentId=$documentId, elementTypeId=$elementTypeId, content=$content, rank=$rank, parentElementId=$parentElementId, ]';
  }

  Element.fromJson(Map<String, dynamic> json) {
    if (json == null) return;
    id =
        json['id']
    ;
    documentId =
        json['documentId']
    ;
    elementTypeId =
        json['elementTypeId']
    ;
    content =
        json['content']
    ;
    rank =
        json['rank']
    ;
    parentElementId =
        json['parentElementId']
    ;
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'documentId': documentId,
      'elementTypeId': elementTypeId,
      'content': content,
      'rank': rank,
      'parentElementId': parentElementId
     };
  }

  static List<Element> listFromJson(List<dynamic> json) {
    return json == null ? new List<Element>() : json.map((value) => new Element.fromJson(value)).toList();
  }

  static Map<String, Element> mapFromJson(Map<String, Map<String, dynamic>> json) {
    var map = new Map<String, Element>();
    if (json != null && json.length > 0) {
      json.forEach((String key, Map<String, dynamic> value) => map[key] = new Element.fromJson(value));
    }
    return map;
  }
}

