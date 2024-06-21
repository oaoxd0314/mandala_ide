import { MandalaGrid } from '@/core/MandalaGrid';
import type { MandalaNode } from '@/core/MandalaNode';
import { useMandalaGridStore } from '@/stores/mandalaGridStore';
import { GRID_TYPE } from '@/constant';


export type MandalaGridComponent = {
    grid: MandalaGrid;
    layout: {
        top: number;
        left: number;
    } | null;
};

export const useMandalaGrid = () => {
    const mandalaGridStore = useMandalaGridStore();

    const setInitGridData = () => {
        const storedData = _getLocalStorageGridData();

        if (storedData.length > 0) {
            mandalaGridStore.gridComponentList = storedData;
        }

        appendNewGrid();
    };

    const appendNewGrid = (layout: MandalaGridComponent['layout'] = null, type: typeof GRID_TYPE[keyof typeof GRID_TYPE] = GRID_TYPE.EXPLORATORY) => {
        let newGrid: MandalaGrid = new MandalaGrid('Exploratory');;

        if (type === GRID_TYPE.SEQUENTIAL) {
            newGrid = new MandalaGrid('Sequential');
        }

        const newGridComponent = _createNewGrid(newGrid, layout);

        mandalaGridStore.gridComponentList.push(newGridComponent);
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

    const _createNewGrid = (grid: MandalaGrid, layout: MandalaGridComponent['layout']) => {
        return {
            grid,
            layout
        };
    };

    return {
        findGridByNode,
        appendNewGrid,
        setInitGridData,
    };
};