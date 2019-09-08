class RQMElementTypes {
  Map<int, String> types;

  RQMElementTypes({
    this.types,
  });

  translateRequirementTypeIdToString(int elementTypeId) {
    return types[elementTypeId];
  }
}
