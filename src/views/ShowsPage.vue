<script setup lang="ts">
import SearchInput from '@/components/SearchInput.vue';
import ShowInfoCard from '@/components/ShowInfoCard.vue';
import { useShowsStore } from '@/stores/shows.store';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const showsStore = useShowsStore();
const router = useRouter();


function navigateToHome() {
  router.push('/');
}

async function navigateToShow(showId: number) {
  await showsStore.fetchShowById(showId);
  router.push(`/show-overview/${showId}`);
}

const searchQuery = ref('');

function updateSearchQuery(query: string) {
  searchQuery.value = query;
}

function searchShows() {
  console.log('searchShows', searchQuery.value);
}

</script>

<template>
  <div class="shows-page">
    <header class="header">
      <SearchInput
        placeholder="Search shows"
        :model-value="searchQuery"
        @update:model-value="updateSearchQuery"
      />
      <button class="action-button" @click="searchShows">Search</button>
      <button class="action-button" @click="navigateToHome">Back to Home</button>
    </header>

    <section class="shows-grid">
      <ShowInfoCard
        v-for="show in showsStore.allCurrentShows"
        :key="show.id"
        :show="show"
        actionBannerText="View show details"
        @show-details="navigateToShow(show.id)"
      />
    </section>
  </div>
</template>

<style scoped>
.shows-page {
  margin: 0 auto;
  max-width: 1400px;
  padding: 1rem;
}

.header {
  margin-bottom: 2rem;
}

.action-button {
  background-color: #3498db;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  padding: 0.5rem 1rem;
  transition: background-color 0.2s;
}

.action-button:hover {
  background-color: #2980b9;
}

.shows-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  justify-items: center;
}

@media (max-width: 768px) {
  .shows-page {
    padding: 0.75rem;
  }
  
  .shows-grid {
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  }
}

@media (min-width: 1024px) {
  .shows-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}

.card-wrapper {
  cursor: pointer;
}
</style>