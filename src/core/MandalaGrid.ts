import { MandalaNode } from '@/core/MandalaNode';
import _ from 'lodash';
import { GRID_TYPE } from '@/constant';

type MandalaGridType = typeof GRID_TYPE[keyof typeof GRID_TYPE];


export interface iMandalaGrid {
    uid: string;
    rootNode: MandalaNode;
    type: MandalaGridType;
}
export class MandalaGrid implements iMandalaGrid {
    uid: string;
    rootNode: MandalaNode;
    type: MandalaGridType;

    constructor(type: MandalaGridType = 'Exploratory', rootNode?: MandalaNode) {
        this.rootNode = rootNode ?? new MandalaNode();
        this.type = type;
        this.uid = _.uniqueId('mandala-grid-');
        this.initializeGrid();
    }

    private initializeGrid(): void {
        if (this.rootNode.hasChildren()) {
            return;
        }

        if (this.type === "Exploratory") {
            const exploreNodes = Array(8).fill(null).map(() => new MandalaNode());
            this.rootNode.children = exploreNodes;
        }


        if (this.type === "Sequential") {
            this.appendChildSequential(this.rootNode, 8);
        }
    }

    private appendChildSequential(currentNode: MandalaNode, depth: number): void {
        if (depth === 0) return;
        const childNode = new MandalaNode();
        currentNode.children.push(childNode);
        this.appendChildSequential(childNode, depth - 1);
    }

    //TODO: to find the all child nodes

}