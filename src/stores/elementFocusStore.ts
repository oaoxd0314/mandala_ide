import { defineStore } from "pinia";
import { ref } from "vue";

export const useElementFocusStore = defineStore('focusElement', () => {
    const focusElement = ref<HTMLElement>();

    return {
        focusElement
    };
});