<template>
    <div
        class="bg-slate-100 text-black p-4 flex items-center justify-center rounded text-wrap overflow-hidden border-solid"
        :class="{
            ['shadow-highlight-primary']: isShaking ? false : isFocus,
            ['shadow-highlight-green']: willFocusNext,
            ['shake shadow-highlight-danger']: isShaking
        }"
    >
        <textarea
            v-if="isFocus"
            ref="input"
            v-model="message"
            contenteditable="true"
            class="outline-none bg-transparent box-border w-fit min-w-4 resize-none overflow-hidden"
            :placeholder="PLACE_HOLDER"
            @keydown="onKeyDown"
        />
        <span
            v-else
            class="overflow-ellipsis"
            :class="{
                ['text-gray-400']: message.length === 0,
                ['text-black']: message.length > 0
            }"
        >
            {{ message.length > 0 ? message : PLACE_HOLDER }} 
        </span>
    </div>
</template>


<script setup lang="ts">
import type { MandalaNode } from  '@/core/MandalaNode';
import {nextTick, ref, watch, type Ref} from 'vue';
import { useMandalaGrid } from '@/composables/useMandalaGrid';
const props = defineProps<{ 
    node: MandalaNode, 
    isFocus:boolean, 
    isShaking:boolean,
    willFocusNext:boolean
}>();

const { saveNodeContext } = useMandalaGrid();
const input: Ref<HTMLElement | undefined> =  ref();
const message = ref(props.node.title);
const PLACE_HOLDER = 'Type something here';

watch(() => props.isFocus, (newVal) => {
    // wait till the textarea ref is ready
    nextTick(() => {
        if(newVal && input.value) {
            input.value.focus();
        }
    });
});

const onKeyDown = (e: KeyboardEvent) => {
    const context = { title: message.value, content: ''};

    switch (e.code) {
        case 'Enter':
        case 'Tab':
            e.preventDefault();
            saveNodeContext(props.node, context);
            break;
        default:
            break;
    }
};

</script>

<style scoped>
.shake {
    padding: 20px;
    font-size: 24px;
    border-radius: 5px;
    cursor: pointer;
    animation: shake 0.5s infinite;
}

@keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    50% { transform: translateX(10px); }
    75% { transform: translateX(-10px); }
    100% { transform: translateX(0); }
}
</style>