/*
openrqm-client-desktop-nwjs
RQMWorkspaceTreeView i18n
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { TreeviewSelection, TreeviewI18nDefault } from 'ngx-treeview';
import { RQMWorkspaceTreeViewItem, } from '../rqmworkspace-tree/rqmworkspacetreeview-item';
import { Injectable } from "@angular/core";

@Injectable()
export class RQMWorkspaceTreeviewI18n extends TreeviewI18nDefault {
    private internalSelectedItem: RQMWorkspaceTreeViewItem;

    set selectedItem(value: RQMWorkspaceTreeViewItem) {
        if (value && value.children === undefined) {
            this.internalSelectedItem = value;
        }
    }

    get selectedItem(): RQMWorkspaceTreeViewItem {
        return this.internalSelectedItem;
    }

    getText(selection: TreeviewSelection): string {
        return this.internalSelectedItem ? this.internalSelectedItem.text : 'All';
    }
}