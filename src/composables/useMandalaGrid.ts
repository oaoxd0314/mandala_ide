import { MandalaGrid } from '@/core/MandalaGrid';
import type { MandalaNode } from '@/core/MandalaNode';
import { useMandalaGridStore } from '@/stores/mandalaGridStore';
import { GRID_TYPE } from '@/constant';


type MandalaGridType = typeof GRID_TYPE[keyof typeof GRID_TYPE];

export const useMandalaGrid = () => {
    const mandalaGridStore = useMandalaGridStore();

    const setInitGridData = () => {
        const storedData = getLocalStorageGridData();
        let gridList: MandalaGrid[] = [createExploratoryGrid()];

        if (storedData.length > 0) {
            gridList = storedData;
        }

        mandalaGridStore.gridList = gridList;
    };

    // TODO: Implement this function
    const getLocalStorageGridData = () => {
        return [];
    };

    const createSequentialGrid = (): MandalaGrid => {
        return new MandalaGrid('Sequential');
    };

    const createExploratoryGrid = (): MandalaGrid => {
        return new MandalaGrid('Exploratory');
    };

    const appendNewGrid = (type: MandalaGridType = GRID_TYPE.EXPLORATORY) => {

        console.log({ type });
        if (type === GRID_TYPE.SEQUENTIAL) {
            mandalaGridStore.gridList.push(createSequentialGrid());
        }

        if (type === GRID_TYPE.EXPLORATORY) {
            mandalaGridStore.gridList.push(createExploratoryGrid());
        }
    };
    // TODO: Implement this function and remove below block
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const findGridByNode = (node: MandalaNode): MandalaGrid | null => {
        return null;
    };

    return {
        findGridByNode,
        appendNewGrid,
        setInitGridData,
        createSequentialGrid,
        createExploratoryGrid
    };
};