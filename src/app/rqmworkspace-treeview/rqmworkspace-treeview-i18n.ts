/*
openrqm-client-desktop-nwjs
RQMWorkspaceTreeView i18n
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 - 2026 Benjamin Schilling
*/

import { RQMWorkspaceTreeViewItem } from '../rqmworkspace-tree/rqmworkspacetreeview-item';

export class RQMWorkspaceTreeviewI18n {
    private internalSelectedItem: RQMWorkspaceTreeViewItem;

    set selectedItem(value: RQMWorkspaceTreeViewItem) {
        if (value && value.children === undefined) {
            this.internalSelectedItem = value;
        }
    }

    get selectedItem(): RQMWorkspaceTreeViewItem {
        return this.internalSelectedItem;
    }

    getText(): string {
        return this.internalSelectedItem ? this.internalSelectedItem.text : 'All';
    }
}
