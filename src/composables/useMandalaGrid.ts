import { MandalaGrid } from '@/core/MandalaGrid';
import type { MandalaNode } from '@/core/MandalaNode';
import { useMandalaGridStore } from '@/stores/gridStore';

export const useMandalaGrid = () => {
    const mandalaGridStore = useMandalaGridStore();

    const setInitGridData = () => {
        const storedData = getLocalStorageGridData();
        let gridList: MandalaGrid[] = [createExploratoryGrid()];

        if (storedData.length > 0) {
            gridList = storedData;
        }

        mandalaGridStore.gridList = gridList
    }

    // TODO: Implement this function
    const getLocalStorageGridData = () => {
        return []
    }

    const createSequentialGrid = (): MandalaGrid => {
        return new MandalaGrid('Sequential');
    }

    const createExploratoryGrid = (): MandalaGrid => {
        return new MandalaGrid('Exploratory');
    }
    // TODO: Implement this function
    const findGridByNode = (node: MandalaNode): MandalaGrid | null => {
        return null;
    }

    return {
        findGridByNode,
        setInitGridData,
        createSequentialGrid,
        createExploratoryGrid
    }
}