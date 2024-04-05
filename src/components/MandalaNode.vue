<template>
    <div class="node" @click="isNodeFocused = true">
        <input autofocus v-if="isNodeFocused" v-model="message"
            @keyup.enter="isNodeFocused = false" ref="input" />
        <span v-else> {{ message }}</span>
    </div>
</template>


<script setup lang="ts">
import { ref, type Ref, type VNodeRef, nextTick, watchEffect } from 'vue'
const node: Ref<VNodeRef | undefined> = ref();
const input: Ref<HTMLInputElement | undefined> = ref();
const message = ref(0);

let dragElement: Ref<EventTarget | null> = ref(null);
let isNodeFocused = ref(false);


watchEffect(() => {
    if (isNodeFocused.value) {
        nextTick(() => {
            input.value?.focus();
        });
    }
});

const dragStart = (event: DragEvent) => {
    console.log('dragStart', event.target)
    dragElement.value = event.target;
};

const dragEnd = (event: DragEvent) => {
    console.log('dragEnd', dragElement.value)
    event.preventDefault();
};

</script>

<style scoped>
.node {
    /* workaround  */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 300px;
    /* workaround  */

    font-size: 24px;
    background-color: #efefef;
    display: flex;
    justify-content: center;
    align-items: center;
    
    color: black;
    border-radius: 5%;
    border: 1px solid black;
    position: absolute;
    padding: 8px;

    /* not sure work */
    text-wrap: wrap;
    overflow: hidden;
    input,
    input:focus {
        background-color: transparent;
        outline: none;
        width: fit-content;
        width: 100%;
        min-width: 24px;
        box-sizing: border-box;
        font-size: inherit;
        border: 0;
        padding: 0
    }
}
</style>