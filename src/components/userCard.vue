<template>
  <div class="user-card">
    <img
      class="user-card--img"
      :src="props.user.picture?.large"
      alt="https://w7.pngwing.com/pngs/819/548/png-transparent-photo-image-landscape-icon-images.png"
      :title="props.user.name?.first"
    />
    <p class="user-card--text">
      <strong>Username:</strong> <br />{{
        props.user.name?.first || "Unknown user =("
      }}
    </p>
    <p v-if="props.user.email" class="user-card--text">
      <strong>Email:</strong> <br />
      {{ props.user.email }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { IUser } from "@/service/api/users";

/**
 * @component UserCard
 * @description A component that displays user information, including a profile image, username, and email.
 * It is designed to be used within a user listing context where multiple UserCard components may be rendered.
 */

/**
 * @typedef {Object} IProps
 * @property {IUser} user - The user object containing user details.
 */

/**
 * Props for the UserCard component.
 * @type {IProps}
 */

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
  height: 270px;
  display: inline-flex;
  flex-direction: column;
  gap: 8px;
  justify-content: space-between;
  padding: 12px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.08);
  &--img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 15px;
  }
  &--text {
    font-size: 14px;
    cursor: default;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
