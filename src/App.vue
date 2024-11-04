<template>
  <div>
    {{ foo }}
  </div>
  <button @click="foo += 1">asdasd</button>
</template>

<script setup lang="ts">
import { ref } from "vue";

const foo = ref<number>(0);
</script>

<style scoped></style>
