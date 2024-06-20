import { defineStore } from "pinia";
import { ref } from "vue";
import type { MandalaGrid } from '@/core/MandalaGrid';

export const useMandalaGridStore = defineStore('mandalaGrid', () => {

    const gridList = ref<MandalaGrid[]>([]);

    return {
        gridList
    };
});