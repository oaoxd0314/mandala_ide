import { MandalaGrid } from '@/core/MandalaGrid';
import type { MandalaNode } from '@/core/MandalaNode';
import { useGridComponentStore } from '@/stores/gridComponentStore';

/**
 * A data structure to render a Mandala Grid
 * 
 * @description 
 */
export type GridComponent = {
    grid: MandalaGrid;
    layout: {
        top: number;
        left: number;
    } | null;
};

export type NodeContext = {
    title?:  MandalaNode['title']
    content?: MandalaNode['content']
}

export const useMandalaGrid = () => {
    const gridComponentStore = useGridComponentStore();

    const setInitGridData = () => {
        const storedData = _getLocalStorageGridData();

        if (storedData.length > 0) {
            gridComponentStore.gridComponentList = storedData;
        }

        const newGrid: MandalaGrid = new MandalaGrid('Exploratory');

        const newGridComponent = createGridComponent(newGrid, null);

        gridComponentStore.gridComponentList.push(newGridComponent);
    };

    const saveNodeContext = (node:MandalaNode ,context: NodeContext) =>{
        context.title ? node.title = context.title : null;
        context.content ? node.content = context.content : null;
    };

    const findNodeById = (grid: MandalaGrid, targetId: string): MandalaNode | null => {
        return grid.nodeList.find(node => node.id === targetId) ?? null;
    };

    /**
     * 解析 node id，取得 node 在 grid 中的 index
     */
    const extractNodeIndex = (namespace:string ,id:string) =>{
        const separatorIndex = id.indexOf("-", namespace.length);

        if (separatorIndex !== -1) {
        return Number(id.slice(separatorIndex + 1));
    }
    
        return null;
    };


    // TODO: Implement this function and remove below block
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const findGridByNode = (node: MandalaNode): MandalaGrid | null => {
        return null;
    };

    // TODO: Implement this function
    const _getLocalStorageGridData = () => {
        return [];
    };

    /**
     * transform MandalaGrid to GridComponent (Grid + Layout)
     */
    const createGridComponent = (grid: MandalaGrid, layout: GridComponent['layout']) => {
        return {
            grid,
            layout
        };
    };

    return {
        extractNodeIndex,
        findGridByNode,
        findNodeById,
        saveNodeContext,
        setInitGridData,
        createGridComponent
    };
};