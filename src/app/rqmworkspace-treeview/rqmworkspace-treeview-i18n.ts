/*
openrqm-client-desktop-nwjs
RQMWorkspaceTreeView i18n
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { TreeviewItem, TreeviewSelection, TreeviewI18nDefault } from 'ngx-treeview';

export class RQMWorkspaceTreeviewI18n extends TreeviewI18nDefault {
    private internalSelectedItem: TreeviewItem;

    set selectedItem(value: TreeviewItem) {
        if (value && value.children === undefined) {
            this.internalSelectedItem = value;
        }
    }

    get selectedItem(): TreeviewItem {
        return this.internalSelectedItem;
    }

    getText(selection: TreeviewSelection): string {
        return this.internalSelectedItem ? this.internalSelectedItem.text : 'All';
    }
}