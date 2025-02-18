<script setup lang="ts">
import { Routes } from '@/core/models/routes.model';
import { PhHouse, PhPopcorn } from '@phosphor-icons/vue';
</script>

<template>
  <nav>
    <div>
      <span class="icon-container">
        <PhHouse :size="18" style="color: white;"/>
        <router-link :to="Routes.HOME">Home</router-link>
      </span>
    </div>
    <div>
      <span class="icon-container">
        <PhPopcorn :size="18" style="color: white;"/>
        <router-link :to="Routes.SHOWS">Shows</router-link>
      </span>
    </div>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: space-evenly;
  background-color: #030a52;
  padding: 1rem;
}

nav a {
  color: white;
  text-decoration: none;
  font-size: 1.25rem;
}

nav a.router-link-active {
  text-decoration: underline;
}

.icon-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
}
</style>