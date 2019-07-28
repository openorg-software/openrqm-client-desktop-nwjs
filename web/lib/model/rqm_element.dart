import 'dart:html';

class RQMElement {
  int elementTypeId;
  String content;
  String rank;

  RQMElement({
    this.elementTypeId,
    this.content,
    this.rank,
  });

  TableRowElement buildElementRow() {
    TableRowElement thisElement = TableRowElement();
    thisElement.children.add(TableCellElement()..text = '$content');
    thisElement.children.add(TableCellElement()..text = '$elementTypeId');
    return thisElement;
  }
}
