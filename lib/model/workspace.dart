part of swagger.api;

class Workspace {
  
  int id = null;
  

  String name = null;
  

  int workspaceId = null;
  
  Workspace();

  @override
  String toString() {
    return 'Workspace[id=$id, name=$name, workspaceId=$workspaceId, ]';
  }

  Workspace.fromJson(Map<String, dynamic> json) {
    if (json == null) return;
    id =
        json['id']
    ;
    name =
        json['name']
    ;
    workspaceId =
        json['workspaceId']
    ;
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'workspaceId': workspaceId
     };
  }

  static List<Workspace> listFromJson(List<dynamic> json) {
    return json == null ? new List<Workspace>() : json.map((value) => new Workspace.fromJson(value)).toList();
  }

  static Map<String, Workspace> mapFromJson(Map<String, Map<String, dynamic>> json) {
    var map = new Map<String, Workspace>();
    if (json != null && json.length > 0) {
      json.forEach((String key, Map<String, dynamic> value) => map[key] = new Workspace.fromJson(value));
    }
    return map;
  }
}

