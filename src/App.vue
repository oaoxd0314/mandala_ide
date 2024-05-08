<script setup lang="ts">
</script>

<template>
  <main>
    <!-- side menu -->
    <div>
      <button class="side-menu"> ||| </button>
    </div>


    <RouterView />

    <!-- bottom tool  -->
    <div class="tool-bar">
      <button> Create New Space </button>
      <button> Create New Grid </button>
      <button> Export Grid </button>
    </div>

  </main>
</template>

<script setup lang="ts">

import { RouterView } from 'vue-router'

</script>

<style scoped>
main {
  height: 100vh;
  position: relative;
}

.side-menu {
  margin: 16px;
  position: absolute;
  top: 0;
  left: 0;
}

.tool-bar {
  justify-content: center;
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  bottom: 0;
  margin: 16px;

  button {
    margin: 8px;
    border: 0;
  }
}
</style>
