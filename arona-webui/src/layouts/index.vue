<script setup lang="ts">
import Navbar from "./Navbar/index.vue";

defineOptions({
  name: "Layout",
});
</script>

<template>
  <div class="font-chinese antialiased">
    <div class="h100%">
      <Navbar />
      <RouterView />
    </div>
  </div>
</template>

<style scoped>

</style>
