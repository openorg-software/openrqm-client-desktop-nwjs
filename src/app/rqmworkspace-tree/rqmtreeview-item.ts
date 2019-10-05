

import { TreeviewItem } from 'ngx-treeview';
export class RQMTreeViewItem extends TreeviewItem {
    public isDocument?: boolean;
    public internalIdentifier?: number;
    public children: RQMTreeViewItem[];
    constructor(text?: string, value?: number, collapsed?: boolean, children?: RQMTreeViewItem[], isDocument?: boolean, internalIdentifier?: number) {
        super({
            text: text, value: value, collapsed: collapsed
        });
        this.isDocument = isDocument;
        this.internalIdentifier = internalIdentifier;
        if (children != null && children.length > 0) {

            this.children = children;
        }
    }
}