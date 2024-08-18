<template>
    <div
        ref="gridElement"
        class="grid grid-cols-3 grid-rows-3 gap-5 justify-center px-4 py-4 cursor-pointer"
        :class="{
            [' border-solid border-2 border-sky-500']: focusNodeId ? focusGridId === grid.id : false,
            ['shadow-highlight-primary']: focusNodeId ? false : focusGridId === grid.id,
        }"
        :style="{ left: `${locate.x}px`, top: `${locate.y}px` }"
        @click="(e: MouseEvent) => handleClick(e)"
        @mousedown="(e) => handleMousedown(e, gridElement)"
        @mousemove="handleMouseMove"
        @mouseup="handleMouseUp"
        @blur.capture="handleBlur"
    >
        <MandalaNode
            v-for="(node, index) in nodes"
            :key="node.id"
            :node="node"
            :is-focus="focusNodeId === node.id"
            :is-shaking="shakingNode === node.id"
            :will-focus-next="false"
            class="w-[100px] h-[100px]"
            :style="`grid-column: ${NodeLayout[index].col}; grid-row:${NodeLayout[index].row};`"
            @click="(e: MouseEvent) => handleClick(e, node.id)"
            @keydown="(e: KeyboardEvent) => handleKeyDown(e, node.id)"
        >
            {{ index }}
        </MandalaNode>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useMouseDrag } from '@/composables/useMouseDrag';
import MandalaNode from '@/components/MandalaNode.vue';
import { useMandalaGrid, type GridComponent } from '@/composables/useMandalaGrid';
import type { MandalaGrid } from '@/core/MandalaGrid';
import type { MandalaNode as iMandalaNode } from '@/core/MandalaNode';

const { grid, container, gridLayout } = defineProps<{ grid: MandalaGrid, container: HTMLElement | null, gridLayout: GridComponent['layout'] }>();
const { locate, handleMouseMove, handleMouseUp, handleMousedown, setInitLocate } = useMouseDrag();
const { extractNodeIndex, findNodeById } = useMandalaGrid();

const gridElement = ref<HTMLElement | null>(null);
const focusGridId = ref<string | null>(null);
const focusNodeId = ref<string | null>(null);
const shakingNode = ref<string | null>(null);
const isPreventBlur = ref<boolean>(false);

const nodes = computed(() => {
    const root = grid.rootNode;
    return [root, ...root.children];
});

onMounted(() => {
    if (gridLayout) {
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

const handleBlur = () => {
    if(isPreventBlur.value) {
        isPreventBlur.value = false;
        return;
    }
    
    focusNodeId.value = null;
    focusGridId.value = null;
};

const handleKeyDown = (e: KeyboardEvent, targetId: string) => {
    const node = findNodeById(grid, targetId);

    if (!node) {
        return;
    }
    

    switch (e.code) {
        case 'Enter':
        case 'Tab':
            if(!isLastNode(node)){
                isPreventBlur.value = true;
            }

            if (!node.title) {
                e.preventDefault();
                setNodeShaking(targetId);
                break;
            }

            focusNextNode(targetId);
            break;
        default:
            break;
    }
};

const handleClick = (e: MouseEvent, targetId: string | null = null) => {
    if(!focusGridId.value){
        focusGridId.value = grid.id;
        return;
    }

    e.stopPropagation();

    focusNodeId.value = targetId;
};

const focusNextNode = (currentId: string) => {
    const namespace = currentId === grid.rootNode.id ? grid.id : grid.rootNode.id;
    const currentIndex = extractNodeIndex(namespace, currentId);

    if (currentIndex === null) {
        return;
    }

    const nextId = grid.rootNode.id === currentId ? `${namespace}-${currentIndex}-1` : `${namespace}-${currentIndex + 1}`;

    focusNodeId.value = nextId;
};

const setNodeShaking = (targetId:string) =>{
    shakingNode.value = targetId;
    setTimeout(() => {
        shakingNode.value = null;
    }, 500);
};

const isLastNode = (node: iMandalaNode | null) => {
    if(!node) {
        return true;
    }

    const nodeList = node.parent?.children ?? [];

    if(nodeList.length === 0) {
        return true;
    }

    return nodeList[nodeList.length - 1].id === node.id;
};

</script>