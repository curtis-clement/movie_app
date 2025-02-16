<script setup lang="ts">
import { Routes } from '@/models/routes.model';

</script>

<template>
  <nav>
    <router-link :to="Routes.HOME">Home</router-link>
    <router-link :to="Routes.SHOWS">Shows</router-link>
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
</style>