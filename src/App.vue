<template>
  <main class="users">
    <!-- User cards displayed here -->
    <section ref="scrollContainer" class="users__container">
      <user-card v-for="user in users" :key="user.email" :user="user" />
    </section>

    <!-- Loader displayed while fetching data -->
    <div v-if="isLoading" class="loader">Loading...</div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import userCard from "@/components/userCard.vue";
import { Users } from "@/service/api/users";
import type { User } from "@/service/api/users";

const usersInst = new Users(); //Class instanse
const users = ref<User[]>([]); // Array to hold user data
const isLoading = ref(false); // Loading state to show/hide loader
const resultsPerPage = 10; // Number of users to fetch per request
const scrollContainer = ref<HTMLElement | null>(null); // Represents html element with Users
let page = 1; // Page count for API requests

// Fetches users from the API and appends them to the users array
const fetchUsers = async () => {
  if (isLoading.value) return; // Prevent multiple requests
  isLoading.value = true;

  try {
    const newUsers = await usersInst.getAllUsers(resultsPerPage);
    users.value.push(...newUsers); // Append new users
    page++;
  } catch (error) {
    console.error("Error fetching users:", error);
  } finally {
    isLoading.value = false;
  }
};

// Infinite scroll handler to detect when user reaches the end of the scrollable container
const handleScroll = () => {
  if (!scrollContainer.value) return;
  const { scrollTop, scrollHeight, clientHeight } = scrollContainer.value;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    fetchUsers();
  }
};

onMounted(() => {
  // Initial data fetch
  fetchUsers();

  // Add scroll event listener to the scroll container
  if (scrollContainer.value) {
    scrollContainer.value.addEventListener("scroll", handleScroll);
  }
});

onUnmounted(() => {
  // Cleanup scroll event listener
  if (scrollContainer.value) {
    scrollContainer.value.removeEventListener("scroll", handleScroll);
  }
});
</script>

<style scoped lang="scss">
.users {
  width: 90dvw;
  height: 90dvh;
  overflow: hidden;
  margin: auto;
  &__container {
    position: relative;
    width: 100%;
    height: 100%;
    max-height: 500px;
    overflow-y: auto;
  }
}
</style>
