<template>
    <div class="node" @click="isNodeFocused = true">
        <input autofocus v-if="isNodeFocused" v-model="message" @keyup.enter="onPressEnter"
            @blur="isNodeFocused = false" ref="input" />
        <span v-else> {{ message.length > 0 ? message : "type some idea" }}</span>
    </div>
</template>


<script setup lang="ts">
import type { iMandalaNode } from '@/core/MandalaNode';
import { ref, type Ref, nextTick, watchEffect } from 'vue'

const { node, focus } = defineProps<{ node: iMandalaNode, focus: boolean }>();
const emit = defineEmits(['focusNextNode'])

const input: Ref<HTMLInputElement | undefined> = ref();
const message = ref(node.title);
const isNodeFocused = ref(false);

watchEffect(() => {
    if (isNodeFocused.value || focus) {
        nextTick(() => {
            input.value?.focus();
        });
    }
});

const onPressEnter = (event: KeyboardEvent) => {
    isNodeFocused.value = false
    emit('focusNextNode');
};

</script>

<style scoped>
.node {
    /* workaround  */
    width: 100px;
    height: 100px;
    /* workaround  */

    font-size: 16px;
    background-color: #efefef;
    display: flex;
    justify-content: center;
    align-items: center;

    color: black;
    border-radius: 5%;
    border: 1px solid black;
    padding: 8px;
    text-wrap: wrap;
    overflow: hidden;

    input,
    input:focus {
        background-color: transparent;
        outline: none;
        width: fit-content;
        width: 100%;
        min-width: 16px;
        box-sizing: border-box;
        font-size: inherit;
        border: 0;
        padding: 0
    }
}
</style>