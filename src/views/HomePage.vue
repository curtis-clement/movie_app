<script setup lang="ts">
import api from '@/api';
import { useShowsStore } from '@/stores/shows.store';
import { useRouter } from 'vue-router';

const router = useRouter();

async function searchShows() {
  const shows = await api.searchShows('a');
  console.log('SHOWS', shows);
}

const showsStore = useShowsStore();

function navigateToShows() {
  router.push('/shows');
}
</script>

<template>
  <div>
    <h1>Home Page</h1>
    <button @click="searchShows">Search Shows</button>
    <button @click="showsStore.fetchAllShows">Get All Shows</button>
    <button @click="console.log('SHOWS', showsStore.showTableData)">Log Shows</button>
    <button @click="api.getShowById(84)">Get Show By Id</button>

    <button @click="navigateToShows">navigate to shows</button>
  </div>
</template>

<style scoped>

</style>