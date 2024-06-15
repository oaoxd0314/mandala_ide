<template>
    <div class=" absolute z-10 bg-gray-700 opacity-0.5 rounded" @click="closeMenu"
        :style="{ top: top + 'px', left: left + 'px' }">
        <ul class="flex flex-col px-1 py-2 gap-1 ">
            <li class="p-2 hover:bg-slate-600 rounded cursor-pointer" v-for="(item, index) in props.items" :key="index"
                @click="item.action">
                {{ item.label }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, computed } from 'vue'

const props = defineProps<{
    items: Array<{
        label: String,
        action: () => void
    }>,
    container: HTMLElement | null
    closeMenu: () => void
    menuPositions: { x: number, y: number }
}>();

const top = computed(() => props.menuPositions.y - (props.container?.offsetTop ?? 0));
const left = computed(() => props.menuPositions.x - (props.container?.offsetLeft ?? 0));

const closeMenu = (event: MouseEvent) => {
    // only left click will close the menu
    if (event.button === 0) {
        props.closeMenu()
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