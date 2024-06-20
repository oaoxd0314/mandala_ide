<template>
    <div
        class=" bg-slate-100 text-black p-2 flex items-center justify-center rounded :hover shadow-md text-wrap overflow-hidden border-solid"
        @click="isNodeFocused = true"
    >
        <input 
            v-if="isNodeFocused"
            ref="input"
            v-model="message"
            class=" :focus outline-none bg-transparent box-border w-fit min-w-4 "
            autofocus
            @focusin="console.log('in')"
            @focusout="console.log('out')"
            @keyup.enter="onPressEnter"
            @blur="isNodeFocused = false"
        >
        <span v-else> {{ message.length > 0 ? message : "type some idea" }}</span>
    </div>
</template>


<script setup lang="ts">
import type { iMandalaNode } from '@/core/MandalaNode';
import { ref, type Ref, nextTick, watch } from 'vue';

const props = defineProps<{ node: iMandalaNode, focus: boolean }>();
const emit = defineEmits(['focusNextNode']);

const input: Ref<HTMLInputElement | undefined> = ref();
const message = ref(props.node.title);
const isNodeFocused = ref(false);

watch(() => props.focus, () => {
    isNodeFocused.value = true;
});

watch(isNodeFocused, (isFocus: boolean) => {
    if (isFocus) {
        nextTick(() => {
            input.value?.focus();
        });
    }
});

const onPressEnter = () => {
    isNodeFocused.value = false;
    emit('focusNextNode');
};

</script>