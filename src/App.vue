<template>
  <main class="users">
    <button class="docs-butt"></button>
    <!-- User cards displayed here -->
    <section ref="scrollContainer" class="users__container">
      <user-card v-for="user in users" :key="user.email" :user="user" />
      <!-- Loader displayed while fetching data -->
      <span v-if="isLoading" class="loader"></span>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import userCard from "@/components/userCard.vue";
import { Users } from "@/service/api/users";
import type { IUser } from "@/service/api/users";

/**
 * @component Users
 * @description A component that displays a list of user cards fetched from the randomuser.me API.
 * It supports infinite scrolling to load more users as the user scrolls down.
 */

// Create an instance of the Users class to manage user data
const usersInst = new Users(); // Class instance for user data management
const users = ref<IUser[]>([]); // Reactive array to hold fetched user data
const isLoading = ref(false); // Reactive state to indicate loading status
const resultsPerPage = 10; // Number of users to fetch per request
const scrollContainer = ref<HTMLElement | null>(null); // Reference to the scrollable user container
let page = 1; // Current page number for API requests

/**
 * Fetches users from the API and appends them to the users array.
 * This function prevents multiple simultaneous requests by checking the loading state.
 * If the fetch is successful, new users are added to the existing array.
 */
const fetchUsers = async () => {
  if (isLoading.value) return; // Prevent multiple requests while loading
  isLoading.value = true; // Set loading state to true

  try {
    const newUsers = await usersInst.getAllUsers(resultsPerPage); // Fetch new users
    users.value.push(...newUsers); // Append new users to the users array
    page++; // Increment the page counter for the next request
  } catch (error) {
    console.error("Error fetching users:", error); // Log any errors during fetch
  } finally {
    isLoading.value = false; // Reset loading state
  }
};

/**
 * Handles the scroll event to detect when the user reaches the end of the scrollable container.
 * If the user is close to the bottom, it triggers a fetch for more users.
 */
const handleScroll = () => {
  if (!scrollContainer.value) return; // Check if the scroll container is defined
  const { scrollTop, scrollHeight, clientHeight } = scrollContainer.value; // Get scroll properties
  // Check if the user has scrolled to the bottom
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    fetchUsers(); // Fetch more users
  }
};

// Lifecycle hook to perform actions on component mount
onMounted(() => {
  fetchUsers(); // Initial data fetch when the component mounts

  // Add scroll event listener to the scroll container
  if (scrollContainer.value) {
    scrollContainer.value.addEventListener("scroll", handleScroll);
  }
});

// Lifecycle hook to perform cleanup when the component is unmounted
onUnmounted(() => {
  // Cleanup scroll event listener to avoid memory leaks
  if (scrollContainer.value) {
    scrollContainer.value.removeEventListener("scroll", handleScroll);
  }
});
</script>

<style scoped lang="scss">
.users {
  width: 100dvw;
  height: 100dvh;
  padding: 50px;
  overflow: hidden;
  &__container {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 16px;
    margin: auto;
    width: 100%;
    height: 100%;
    max-height: 600px;
    max-width: 1000px;
    overflow-y: auto;
    .loader {
      grid-column: 1 / -1;
      margin-top: 30px;
      justify-self: center;
      width: 48px;
      height: 48px;
      border: 5px solid #d54ca0;
      border-bottom-color: transparent;
      border-radius: 50%;
      display: inline-block;
      box-sizing: border-box;
      animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
}
</style>
