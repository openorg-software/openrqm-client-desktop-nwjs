part of swagger.api;

class Elements {
    Elements();

  @override
  String toString() {
    return 'Elements[]';
  }

  Elements.fromJson(Map<String, dynamic> json) {
    if (json == null) return;
  }

  Map<String, dynamic> toJson() {
    return {
     };
  }

  static List<Elements> listFromJson(List<dynamic> json) {
    return json == null ? new List<Elements>() : json.map((value) => new Elements.fromJson(value)).toList();
  }

  static Map<String, Elements> mapFromJson(Map<String, Map<String, dynamic>> json) {
    var map = new Map<String, Elements>();
    if (json != null && json.length > 0) {
      json.forEach((String key, Map<String, dynamic> value) => map[key] = new Elements.fromJson(value));
    }
    return map;
  }
}

