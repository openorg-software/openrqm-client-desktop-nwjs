/*
openrqm-client-desktop-nwjs
RQMWorkspaceTreeViewItem Class
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019-2020 Benjamin Schilling
*/

import { TreeviewItem } from 'ngx-treeview';
export class RQMWorkspaceTreeViewItem extends TreeviewItem {
    public isDocument?: boolean;
    public internalIdentifier?: number;
    public children: RQMWorkspaceTreeViewItem[];
    constructor(text?: string, value?: number, collapsed?: boolean, children?: RQMWorkspaceTreeViewItem[], isDocument?: boolean, internalIdentifier?: number) {
        super({
            text: text, value: value, collapsed: collapsed
        });
        this.isDocument = isDocument;
        this.internalIdentifier = internalIdentifier;
        if (children != null && children.length > 0) {

            this.children = children;
        }
    }


    public isItemDocument(): boolean {
        if (this.isDocument) {
            return true;
        } else {
            return false;
        }
    }

    public isItemWorkspace(): boolean {
        if (!this.isDocument) {
            return true;
        } else {
            return false;
        }
    }
}