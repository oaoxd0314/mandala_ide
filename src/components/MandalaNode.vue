<template>
    <div
        class="bg-slate-100 text-black p-4 flex items-center justify-center rounded text-wrap overflow-hidden border-solid"
        :class="{['shadow-highlight-primary']:true,['shadow-highlight-greens']:true}"
    >
        <input 
            v-if="true"
            ref="input"
            v-model="message"
            class="  outline-none bg-transparent box-border w-fit min-w-4 "
            autofocus
            @focusin=" console.log('in') "
            @focusout=" console.log('out') "
            @keyup.enter="onPressEnter"
        >
        <span v-else> {{ message.length > 0 ? message : "type some idea" }}</span>
    </div>
</template>


<script setup lang="ts">
import type { iMandalaNode } from '@/core/MandalaNode';
import { ref, type Ref} from 'vue';

const props = defineProps<{ node: iMandalaNode }>();

const input: Ref<HTMLInputElement | undefined> = ref();
const message = ref(props.node.title);



const onPressEnter = () => {
};

</script>