part of swagger.api;

class Documents {
    Documents();

  @override
  String toString() {
    return 'Documents[]';
  }

  Documents.fromJson(Map<String, dynamic> json) {
    if (json == null) return;
  }

  Map<String, dynamic> toJson() {
    return {
     };
  }

  static List<Documents> listFromJson(List<dynamic> json) {
    return json == null ? new List<Documents>() : json.map((value) => new Documents.fromJson(value)).toList();
  }

  static Map<String, Documents> mapFromJson(Map<String, Map<String, dynamic>> json) {
    var map = new Map<String, Documents>();
    if (json != null && json.length > 0) {
      json.forEach((String key, Map<String, dynamic> value) => map[key] = new Documents.fromJson(value));
    }
    return map;
  }
}

