<script setup lang="ts">
import searchApi from '@/api/search.api';
import showsApi from '@/api/shows.api';
import { useShowsStore } from '@/stores/shows.store';

async function searchShows() {
  const shows = await searchApi.searchShows('a');
  console.log('SHOWS', shows);
}



const showsStore = useShowsStore();
</script>

<template>
  <div>Main Page</div>
  <button @click="searchShows">Search Shows</button>
  <button @click="showsStore.fetchAllShows">Get All Shows</button>
  <button @click="console.log('SHOWS', showsStore.shows)">Log Shows</button>
  <button @click="showsApi.getShowById(84)">Get Show By Id</button>
</template>

<style scoped>

</style>
