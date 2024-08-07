<template>
    <div
        class="bg-slate-100 text-black p-4 flex items-center justify-center rounded text-wrap overflow-hidden border-solid"
        :class="{
            ['shadow-highlight-primary']: isFocus,
            ['shadow-highlight-green']: willFocusNext,
        }"
    >
        <textarea
            ref="input"
            v-model="message"
            contenteditable="true"
            class="outline-none bg-transparent box-border w-fit min-w-4 resize-none overflow-hidden  "
            placeholder="Type something here"
            @keydown.enter="onPressEnter"
        />
    </div>
</template>


<script setup lang="ts">
import type { MandalaNode } from  '@/core/MandalaNode';
import {ref, type Ref} from 'vue';

const props = defineProps<{ 
    node: MandalaNode, 
    isFocus:boolean, 
    willFocusNext:boolean
}>();

const input: Ref<HTMLDivElement | undefined> =  ref();
const message = ref(props.node.title);

const onPressEnter = (e: KeyboardEvent) =>{
    e.preventDefault();
    input.value?.blur();
};

</script>