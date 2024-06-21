<template>
    <div
        class=" absolute z-10 bg-gray-700 opacity-0.5 rounded"
        :style="{ top: props.menuPositions.y + 'px', left: props.menuPositions.x + 'px' }"
        @click="closeMenu"
    >
        <ul class="flex flex-col px-1 py-2 gap-1 ">
            <li
                v-for="(item, index) in props.items"
                :key="index"
                class="p-2 hover:bg-slate-600 rounded cursor-pointer"
                @click="item.action"
            >
                {{ item.label }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
const props = defineProps<{
    items: Array<{
        label: string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        action: (arg: any) => void;
    }>,
    closeMenu: () => void
    menuPositions: { x: number, y: number }
}>();

const closeMenu = (event: MouseEvent) => {
    // only left click will close the menu
    if (event.button === 0) {
        props.closeMenu();
    }
};

onMounted(() => {
    document.addEventListener('click', closeMenu);
});

onUnmounted(() => {
    document.removeEventListener('click', closeMenu);
});

</script>

<style scoped>
.context-menu {
    position: absolute;
    z-index: 1000;
    background-color: #fff;
    color: #000;
    padding: 0
}
</style>