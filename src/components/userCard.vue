<template>
  <div class="user-card"></div>
</template>

<script setup lang="ts">
import type { IUser } from "@/service/api/users";

interface IProps {
  user: IUser;
}

const props = defineProps<IProps>();
</script>

<style scoped lang="scss">
.user-card {
  position: relative;
  overflow: hidden;
  background-color: #f3f7fe;
  border-radius: 15px;
  width: 220px;
  height: 300px;
  display: inline-flex;
  flex-direction: column;
  gap: 12px;
  justify-content: space-between;
  padding: 12px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.08);
}
</style>
