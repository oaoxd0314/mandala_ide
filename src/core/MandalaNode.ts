
export interface iMandalaNode {
    title: string;
    content: string;
    children: MandalaNode[];
    updateTitle(newTitle: string): void;
}

export class MandalaNode implements iMandalaNode{
    title: string;
    content: string;
    children: MandalaNode[];

    constructor(title: string = '', content: string = '') {
        this.title = title;
        this.content = content;
        this.children = [];
    }

    updateTitle(newTitle: string): void {
        this.title = newTitle;
    }

    updateContent(newContent: string): void {
        this.content = newContent;
    }

    hasChildren(): boolean {
        return this.children.length > 0;
    }
}