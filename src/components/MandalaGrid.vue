<template>
    <div
        ref="gridElement"
        class="grid grid-cols-3 grid-rows-3 gap-5 justify-center px-4 py-4 "
        :class="{
            ['shadow-highlight-primary']: grid.girdId === focusTargetId,
        }"
        :style="{ left: `${locate.x}px`, top: `${locate.y}px` }"
        @focusout="handleBlur"
        @click="(e:MouseEvent) => handleClick(e, grid.girdId)"
        @mousedown="(e) => handleMousedown(e, gridElement)"
        @mousemove="handleMouseMove"
        @mouseup="handleMouseUp"
    >
        <MandalaNode
            v-for="(node, index) in nodes"
            :key="node.id"
            :node="node"
            :is-focus="node.id === focusTargetId"
            :will-focus-next="isNodeWillFocusNext(node)"
            class="w-[100px] h-[100px]"
            :style="`grid-column: ${NodeLayout[index].col}; grid-row:${NodeLayout[index].row};`"
            @click="(e:MouseEvent) => handleClick(e, node.id)"
            @keydown="(e:KeyboardEvent)=>handleKeyDown(e, node.id)"
        >
            {{ index }}
        </MandalaNode>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useMouseDrag } from '@/composables/useMouseDrag';
import MandalaNode from '@/components/MandalaNode.vue';
import { useMandalaGrid, type GridComponent } from '@/composables/useMandalaGrid';
import type { MandalaGrid } from '@/core/MandalaGrid';
import type { MandalaNode as iMandalaNode } from '@/core/MandalaNode';
import { GRID_TYPE } from '@/constant';

const { grid, container, gridLayout } = defineProps<{ grid: MandalaGrid, container: HTMLElement | null, gridLayout:GridComponent['layout'] }>();
const { locate, handleMouseMove, handleMouseUp, handleMousedown, setInitLocate } = useMouseDrag();
const { extractNodeIndex } = useMandalaGrid();
const focusTargetId = ref<string | null>(null);
const gridElement = ref<HTMLElement | null>(null);

const nodes = computed(() => {
    const root = grid.rootNode;
    return [root, ...root.children];
});



watch(focusTargetId,(val)=>{
    console.log(val);
});

const NodeLayout = [
    { col: 2, row: 2 }, // 中間
    { col: 3, row: 2 }, // 右中
    { col: 3, row: 3 }, // 右下
    { col: 2, row: 3 }, // 下中
    { col: 1, row: 3 }, // 左下
    { col: 1, row: 2 }, // 左中
    { col: 1, row: 1 }, // 左上
    { col: 2, row: 1 }, // 上中
    { col: 3, row: 1 }  // 右上
];


const handleKeyDown = (e: KeyboardEvent, targetId: string) => {
    if (e.key === 'Tab') {
        focusTargetId.value = targetId;
    }
};

const handleBlur = () => {
    focusTargetId.value = null;
};

const handleClick = (e: MouseEvent, targetId: string) => {
    if(focusTargetId.value){
        e.preventDefault();
        e.stopPropagation();
        return;
    }

    focusTargetId.value = targetId;
};

/**
 * TODO: complete me
 */
const isNodeWillFocusNext = (node: iMandalaNode) => {
    if(!focusTargetId.value){
        return false;
    }

    if(node.id === grid.rootNode.id){
        return false;
    }
    
    const namespace = grid.girdId;
    const nodeIndex = extractNodeIndex(namespace, node.id);
    const focusNodeIndex = extractNodeIndex(namespace, focusTargetId.value);

    if(!nodeIndex || !focusNodeIndex){
        return false;
    }

    if(grid.type === GRID_TYPE.EXPLORATORY ){
        return true;
    }

    if(nodeIndex + 1 === focusNodeIndex){
        return true;
    }   

    return false;
};



onMounted(() => {
    if(gridLayout){
        setInitLocate(gridLayout.top, gridLayout.left);
        return;
    }

    if (container && gridElement.value) {
        const elOffsetWidth = gridElement.value.offsetWidth ?? 0;
        const elOffsetHeight = gridElement.value.offsetHeight ?? 0;
        const top = (container.clientHeight - elOffsetHeight) / 2;
        const left = (container.clientWidth - elOffsetWidth) / 2;

        setInitLocate(top, left);
    }
});
</script>