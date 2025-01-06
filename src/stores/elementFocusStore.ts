import { defineStore } from "pinia";
import { ref } from "vue";

export const useElementFocusStore = defineStore('focusElement', () => {

    const focusId = ref<string>();

    const setGlobalFocusElement = (id: string) => {
        focusId.value = id;
    };

    return {
        focusId,
        setGlobalFocusElement
    };
});