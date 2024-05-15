<template>
    <div ref="gridElement" class="grid-container">
        <MandalaNode @focusNextNode="focusNextNode(index)" :focus="focusTarget === index" :node="node"
            v-for="(node, index) in nodes" :key="index"
            :style="`grid-column: ${gridLayout[index].col}; grid-row:${gridLayout[index].row};`">
            {{ index }}
        </MandalaNode>
    </div>

</template>

<script setup lang="ts">
import type { iMandalaGrid } from '@/core/MandalaGrid'
import { computed, ref } from 'vue';
import MandalaNode from '@/components/MandalaNode.vue';

const gridElement = ref<HTMLElement | null>(null);
const { grid } = defineProps<{ grid: iMandalaGrid }>();
const focusTarget = ref<number | null>(null);

defineExpose({
    gridElement
})

const gridLayout = [
    { col: 2, row: 2 }, // 中間
    { col: 3, row: 2 }, // 右中
    { col: 3, row: 3 }, // 右下
    { col: 2, row: 3 }, // 下中
    { col: 1, row: 3 }, // 左下
    { col: 1, row: 2 }, // 左中
    { col: 1, row: 1 }, // 左上
    { col: 2, row: 1 }, // 上中
    { col: 3, row: 1 }  // 右上
]

const focusNextNode = (index: number) => {
    focusTarget.value = index + 1;
}

const nodes = computed(() => {
    const root = grid.rootNode;

    return [root, ...root.children]
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