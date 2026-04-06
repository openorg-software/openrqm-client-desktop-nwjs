/*
openrqm-client-desktop-nwjs
RQMWorkspaceTreeViewItem Class
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 - 2026 Benjamin Schilling
*/

export class RQMWorkspaceTreeViewItem {
    text: string;
    value: number;
    collapsed: boolean;
    children: RQMWorkspaceTreeViewItem[];
    private isDocument?: boolean;
    public internalIdentifier?: number;

    constructor(text?: string, value?: number, collapsed?: boolean, children?: RQMWorkspaceTreeViewItem[], isDocument?: boolean, internalIdentifier?: number) {
        this.text = text;
        this.value = value;
        this.collapsed = collapsed !== undefined ? collapsed : false;
        this.isDocument = isDocument;
        this.internalIdentifier = internalIdentifier;
        this.children = (children != null && children.length > 0) ? children : undefined;
    }

    public isItemDocument(): boolean {
        return !!this.isDocument;
    }

    public isItemWorkspace(): boolean {
        return !this.isDocument;
    }
}
