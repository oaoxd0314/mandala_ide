import { ref } from 'vue'; 
import { MandalaGrid } from '@/core/MandalaGrid';
import type { MandalaNode } from '@/core/MandalaNode';

export const useMandalaGridGrid = () => {
    const createSequentialGrid = (): MandalaGrid => {
        return new MandalaGrid('Sequential');
    }
    
    const createExploratoryGrid = (): MandalaGrid => {
        return new MandalaGrid('Exploratory');
    }

    const rootGrid = ref(createExploratoryGrid());

    const findGridByNode = (node: MandalaNode): MandalaGrid | null => {
        return null;
    }

    return {
        rootGrid,
        findGridByNode,
        createSequentialGrid,
        createExploratoryGrid
    }
}