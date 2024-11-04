<template>
  <div class="user-card"></div>
</template>

<script setup lang="ts">
import type { User } from "@/service/api/users";

interface IProps {
  user: User;
}

const props = defineProps<IProps>();
</script>

<style scoped lang="scss">
.user-card {
  position: relative;
  overflow: hidden;
  width: 50px;
  height: 50px;
  border: 1px solid;
}
</style>
