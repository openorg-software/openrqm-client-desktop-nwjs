/*
openrqm-client-desktop-nwjs
RQMWorkspaceTreeView i18n
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { TreeviewSelection, TreeviewI18nDefault } from 'ngx-treeview';
import { RQMTreeViewItem, } from '../rqmworkspace-tree/rqmtreeview-item';

export class RQMWorkspaceTreeviewI18n extends TreeviewI18nDefault {
    private internalSelectedItem: RQMTreeViewItem;

    set selectedItem(value: RQMTreeViewItem) {
        if (value && value.children === undefined) {
            this.internalSelectedItem = value;
        }
    }

    get selectedItem(): RQMTreeViewItem {
        return this.internalSelectedItem;
    }

    getText(selection: TreeviewSelection): string {
        return this.internalSelectedItem ? this.internalSelectedItem.text : 'All';
    }
}