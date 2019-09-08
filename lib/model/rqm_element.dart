/*
openrqm-client-desktop-nwjs
RQMElement class
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

class RQMElement {
  int elementTypeId;
  String content;
  String rank;

  RQMElement({
    this.elementTypeId,
    this.content,
    this.rank,
  });
}
