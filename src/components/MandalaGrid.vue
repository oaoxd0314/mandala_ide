<template>
    <div
        ref="gridElement"
        class="grid-container"
        :style="{ left: `${locate.x}px`, top: `${locate.y}px` }"
        @mousedown="(e) => handleMousedown(e, gridElement)"
        @mousemove="handleMouseMove"
        @mouseup="handleMouseUp"
    >
        <MandalaNode
            v-for="(node, index) in nodes"
            :key="index"
            :focus="focusTarget === index"
            :node="node"
            :style="`grid-column: ${NodeLayout[index].col}; grid-row:${NodeLayout[index].row};`"
            @focus-next-node="focusNextNode(index)"
        >
            {{ index }}
        </MandalaNode>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useMouseDrag } from '@/composables/useMouseDrag';
import MandalaNode from '@/components/MandalaNode.vue';
import { type MandalaGridComponent } from '@/composables/useMandalaGrid';
import type { iMandalaGrid } from '@/core/MandalaGrid';

const { grid, container, gridLayout } = defineProps<{ grid: iMandalaGrid, container: HTMLElement | null, gridLayout:MandalaGridComponent['layout'] }>();
const gridElement = ref<HTMLElement | null>(null);
const focusTarget = ref<number | null>(null);

const { locate, handleMouseMove, handleMouseUp, handleMousedown, setInitLocate } = useMouseDrag();

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



const focusNextNode = (index: number) => {
    focusTarget.value = index + 1;
};

const nodes = computed(() => {
    const root = grid.rootNode;

    return [root, ...root.children];
});

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

<style scoped>
.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: repeat(3, 100px);
    gap: 10px;
    justify-content: center;
}
</style>