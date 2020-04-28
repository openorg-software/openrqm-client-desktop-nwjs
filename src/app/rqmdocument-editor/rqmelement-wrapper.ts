/*
openrqm-client-desktop-nwjs
RQMElementWrapper Class
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019-2020 Benjamin Schilling
*/

import { RQMElement, RQMLink } from 'openrqm-api';

export class RQMElementWrapper implements RQMElement {
    public content: string;
    public documentId: number;
    public elementTypeId: number;
    public id: number;
    public parentElementId: number;
    public rank: string;
    inlinks: RQMLink[];
    outlinks: RQMLink[];

    constructor(wrappedElement: RQMElement, inlinks: RQMLink[], outlinks: RQMLink[]) {
        this.content = wrappedElement.content;
        this.documentId = wrappedElement.documentId;
        this.elementTypeId = wrappedElement.elementTypeId;
        this.id = wrappedElement.id;
        this.parentElementId = wrappedElement.parentElementId;
        this.rank = wrappedElement.rank;
        this.inlinks = inlinks;
        this.outlinks = outlinks;
    }

}