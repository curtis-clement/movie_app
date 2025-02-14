<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useShowsStore } from '@/stores/shows.store';

const router = useRouter();
const showsStore = useShowsStore();

function navigateToHome() {
  router.push('/');
}
</script>

<template>
  <div>
    <h1>Show Overview</h1>
    <button @click="navigateToHome">Back to Home</button>
    <div v-if="showsStore.selectedShow">
      <h2>{{ showsStore.selectedShow.name }}</h2>
      <p v-html="showsStore.selectedShow.summary"></p>
    </div>
  </div>
</template>

<style scoped></style>