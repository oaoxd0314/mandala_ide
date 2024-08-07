
/**
 *  Responsibility: manage the node's properties and data storage
 */
export class MandalaNode  {
    title: string = '';
    content: string = '';
    private _id: string;
    private _parent: MandalaNode | null = null;
    private _children: MandalaNode[] = [];

    constructor(namespace: string, index: number, parent: MandalaNode | null = null) {
        this._id = `${namespace}-${index}`;
        this._parent = parent;
    }

    get children(): MandalaNode[] {
        return this._children;
    }

    get id(): string {
        return this._id;
    }

    get parent(): MandalaNode | null {
        return this._parent;
    }

    updateChildren(children: MandalaNode[] = []) {
        this.children.push(...children);
    }

    hasChildren(): boolean {
        return this.children.length > 0;
    }

    updateTitle(newTitle: string): void {
        this.title = newTitle;
    }

    updateContent(newContent: string): void {
        this.content = newContent;
    }

}