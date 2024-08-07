import { MandalaNode } from '@/core/MandalaNode';
import _ from 'lodash';
import { GRID_TYPE } from '@/constant';

type MandalaGridType = typeof GRID_TYPE[keyof typeof GRID_TYPE];


/**
 * default number of child nodes in the grids structure
 */
const GRID_CHILD_COUNT = 8;

/**
 *  Responsibility: manage the node's link and structure
 */
export class MandalaGrid {
    
    type: MandalaGridType;
    private _girdId: string;
    private _rootNode: MandalaNode;

    constructor(type: MandalaGridType = 'Exploratory', rootNode?: MandalaNode) {
        this.type = type;
        this._girdId = _.uniqueId('mandala-grid');
        this._rootNode = rootNode ?? new MandalaNode(this._girdId, 0);
        this._initializeGrid();
    }

    get rootNode(): MandalaNode {
        return this._rootNode;
    }

    get girdId(): string {
        return this._girdId;
    }

    private _initializeGrid(): void {
        if (this._rootNode.hasChildren()) {
            return;
        }

        this._addLayer(this.rootNode.id);
    }

    /**
     * add a whole layer of child nodes to the grid
     */
    private _addLayer(parentId: string) {
        const children = Array(GRID_CHILD_COUNT).fill(null).map((_, index) => new MandalaNode(parentId, index+1, this._rootNode));
        this._rootNode.updateChildren(children);
    }

    /**
     * add a whole layer by depth
     */
    private _recursiveAddLayerWithDepth(currentNode: MandalaNode, SequentialDepth = GRID_CHILD_COUNT) {
        if (SequentialDepth === 0) return;

        this._addLayer(currentNode.id);

        this._recursiveAddLayerWithDepth(currentNode, SequentialDepth - 1);
    }

    //TODO: to find the all child nodes

}