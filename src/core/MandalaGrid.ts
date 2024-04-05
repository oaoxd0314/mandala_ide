import { MandalaNode } from '@/core/MandalaNode';

type GridType = 'Exploratory' | 'Sequential';

export class MandalaGrid {
    rootNode: MandalaNode;
    type: GridType;

    constructor(type: GridType = 'Exploratory',rootNode?: MandalaNode) {
        this.rootNode = rootNode ?? new MandalaNode(); 
        this.type = type;
        this.initializeGrid();
    }

    private initializeGrid(): void {
        if(this.rootNode.hasChildren()){
            return;
        }

        if (this.type === "Exploratory") {
            const exploreNodes = Array(8).fill(null).map(() => new MandalaNode());
            this.rootNode.children = exploreNodes
        }
        
        
        if (this.type === "Sequential") {
            this.appendChildSequential(this.rootNode,8)
        }
    }

    private appendChildSequential(currentNode: MandalaNode, depth: number): void {
        if (depth === 0) return;
        const childNode = new MandalaNode();
        currentNode.children.push(childNode);
        this.appendChildSequential(childNode, depth - 1);
    }

}