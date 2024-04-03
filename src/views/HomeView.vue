<template>
    <div class="node" draggable="true" @dragstart="dragStart" @dragend="dragEnd">
        {{ count }}
    </div>
</template>

<script lang="ts" setup>
import { ref,type Ref } from 'vue'

const count = ref(0)

let dragElement: Ref<EventTarget | null> = ref(null);

const dragStart = (event: DragEvent) => {

    console.log('dragStart', event.target)

  dragElement.value = event.target;
  event.dataTransfer.setData('text/plain', event.target.id);
  event.dataTransfer.effectAllowed = 'move';
};

const dragEnd = (event: DragEvent) => {
    console.log('dragEnd',dragElement.value)
  event.preventDefault();
  dragElement.value.style.opacity = '1';
};

</script>

<style scoped>
.node {
    width: 100px;
    height: 100px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    color: black;
    border-radius: 5%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>