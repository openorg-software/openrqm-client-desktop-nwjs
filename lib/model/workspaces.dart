part of swagger.api;

class Workspaces {
    Workspaces();

  @override
  String toString() {
    return 'Workspaces[]';
  }

  Workspaces.fromJson(Map<String, dynamic> json) {
    if (json == null) return;
  }

  Map<String, dynamic> toJson() {
    return {
     };
  }

  static List<Workspaces> listFromJson(List<dynamic> json) {
    return json == null ? new List<Workspaces>() : json.map((value) => new Workspaces.fromJson(value)).toList();
  }

  static Map<String, Workspaces> mapFromJson(Map<String, Map<String, dynamic>> json) {
    var map = new Map<String, Workspaces>();
    if (json != null && json.length > 0) {
      json.forEach((String key, Map<String, dynamic> value) => map[key] = new Workspaces.fromJson(value));
    }
    return map;
  }
}

