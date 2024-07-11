<template>
    <div
        class="bg-slate-100 text-black p-4 flex items-center justify-center rounded text-wrap overflow-hidden border-solid"
        :class="{['shadow-highlight-primary']:isNodeFocused,['shadow-highlight-greens']:isNodeWillFocusNext}"
        @click="isNodeFocused = true"
    >
        <input 
            v-if="isNodeFocused"
            ref="input"
            v-model="message"
            class="  outline-none bg-transparent box-border w-fit min-w-4 "
            autofocus
            @focusin=" console.log('in') "
            @focusout=" console.log('out') "
            @keyup.enter="onPressEnter"
            @blur="isNodeFocused = false"
        >
        <span v-else> {{ message.length > 0 ? message : "type some idea" }}</span>
    </div>
</template>


<script setup lang="ts">
import type { iMandalaNode } from '@/core/MandalaNode';
import { ref, type Ref, nextTick, watch } from 'vue';

const props = defineProps<{ node: iMandalaNode, focus: boolean, isFocusNext: boolean }>();
const emit = defineEmits(['focusNextNode']);

const input: Ref<HTMLInputElement | undefined> = ref();
const message = ref(props.node.title);
const isNodeFocused = ref(false);
const isNodeWillFocusNext = ref(false);

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