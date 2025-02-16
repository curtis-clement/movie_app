<script setup lang="ts">
import SearchInput from '@/components/SearchInput.vue';
import ShowInfoCard from '@/components/ShowInfoCard.vue';
// import TextChip from '@/components/TextChip.vue';
import FilterPanel from '@/components/FilterPanel.vue';
import { useShowsStore } from '@/stores/shows.store';
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import { FilterCategories, RatingFilterOption, ShowStatusFilterOption } from '@/models/filter.model';
import { Routes } from '@/models/routes.model';

const showsStore = useShowsStore();
const router = useRouter();


function navigateToHome() {
  router.push(Routes.HOME);
}

async function navigateToShow(showId: number) {
  await showsStore.fetchShowById(showId);
  router.push(`${Routes.SHOW_OVERVIEW}/${showId}`);
}

function updateSearchQuery(query: string) {
  showsStore.updateSearchQuery(query);
}

function searchShows() {
  showsStore.searchShows();
}

const selectedFilterName = ref('');

const filters = computed(() => {
  const filters = [
    {
      filterName: FilterCategories.GENRE,
      options: showsStore.allGeneresForCurrentShows,
      selectedOptions: showsStore.selectedFilterByGenre,
    },
    {
      filterName: FilterCategories.STATUS,
      options: [ShowStatusFilterOption.RUNNING, ShowStatusFilterOption.ENDED, ShowStatusFilterOption.TO_BE_DETERMINED],
      selectedOptions: showsStore.selectedFilterByStatus,
    },
    {
      filterName: FilterCategories.RATING,
      options: [RatingFilterOption.HIGHEST, RatingFilterOption.LOWEST],
      selectedOptions: [showsStore.selectedFilterByRating],
    }
  ];
  return filters;
});

function toggleFilter(filterName: string) {
  if (selectedFilterName.value === filterName) {
    selectedFilterName.value = '';
  } else {
    selectedFilterName.value = filterName;
  }
}

function handleChipClick(filterName: string, option: string) {
  if (filterName === FilterCategories.GENRE) {
    showsStore.setSelectedFilterByGenre(option);
  } else if (filterName === FilterCategories.STATUS) {
    showsStore.setSelectedFilterByStatus(option);
  } else if (filterName === FilterCategories.RATING) {
    showsStore.setSelectedFilterByRating(option as RatingFilterOption);
  }
}
</script>

<template>
  <div class="shows-page">
    <header class="header">
      <SearchInput
        placeholder="Search shows"
        :model-value="showsStore.searchQuery"
        @update:model-value="updateSearchQuery"
      />
      <button class="action-button" @click="searchShows">Search</button>
      <button class="action-button" @click="navigateToHome">Back to Home</button>
    </header>

    <section class="filters-panel">
      <FilterPanel
        :filters="filters"
        :selected-filter-name="selectedFilterName"
        @toggle-filter="toggleFilter"
        @chip-click="handleChipClick"
      />
    </section>

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