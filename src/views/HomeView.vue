<template>
  <MandalaNode />
</template>

<script setup lang="ts">
import MandalaNode from '@/components/MandalaNode.vue'
import { useMandalaGridGrid } from '@/composables/useMandalaGrid'

const { rootGrid, findGridByNode } = useMandalaGridGrid();

console.log(rootGrid.value)

</script>
