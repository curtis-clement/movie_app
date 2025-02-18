<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Routes } from '@/models/routes.model';
import { useShowsStore } from '@/modules/shows/stores/shows.store';
import DefaultButton from '@/core/components/DefaultButton.vue';
import FilterPanel from '@/core/components/FilterPanel.vue';
import PaginationControl from '@/core/components/PaginationControl.vue';
import SearchInput from '@/core/components/SearchInput.vue';
import ShowInfoCard from '@/modules/shows/components/ShowInfoCard.vue';
import { FilterCategories, RatingFilterOption, ShowStatusFilterOption } from '@/models/filter.model';

const showsStore = useShowsStore();
const router = useRouter();
const selectedFilterName = ref('');
const areShowsLoading = ref(false);
const areButtonsDisabled = computed(() => {
  return showsStore.searchQuery.length === 0;
});


async function navigateToShow(showId: number) {
  await showsStore.fetchShowById(showId);
  router.push(`${Routes.SHOW_OVERVIEW}/${showId}`);
}

function updateSearchQuery(query: string) {
  showsStore.updateSearchQuery(query);
}

function searchShows() {
  areShowsLoading.value = true;
  showsStore.searchShows();
  areShowsLoading.value = false;
}

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

async function clearSearchQuery() {
  showsStore.clearSearchQuery();
  areShowsLoading.value = true;
  showsStore.clearAllShows();
  await showsStore.fetchAllShows();
  areShowsLoading.value = false;
}

async function handlePageChange(newPage: number) {
  showsStore.setCurrentPage(newPage);
  
  const areMoreShowsNeeded = newPage * showsStore.itemsPerPage > showsStore.shows.length - showsStore.itemsPerPage;

  if (areMoreShowsNeeded) {
    areShowsLoading.value = true;
    await showsStore.fetchAllShows();
    areShowsLoading.value = false;
  }
}

onMounted(async () => {
  if (showsStore.shows.length === 0) {
    areShowsLoading.value = true;
    await showsStore.fetchAllShows();
    areShowsLoading.value = false;
  }
});
</script>

<template>
  <div class="shows-page">
    <div class="controls-container">
      <section class="top-controls">
        <section class="search-controls">
          <SearchInput
            placeholder="Search shows"
            :model-value="showsStore.searchQuery"
            @update:model-value="updateSearchQuery"
          />
          <DefaultButton @button-click="searchShows" :disabled="areButtonsDisabled">
            <template #text>Search</template>
          </DefaultButton>
          <DefaultButton @button-click="clearSearchQuery" :disabled="areButtonsDisabled">
            <template #text>Clear</template>
          </DefaultButton>
        </section>

        <section class="filters-panel">
          <FilterPanel
            :filters="filters"
            :selected-filter-name="selectedFilterName"
            @toggle-filter="toggleFilter"
            @chip-click="handleChipClick"
            @clear-filters="showsStore.clearAllFilters();"
          />
        </section>
      </section>
    </div>

    <PaginationControl
      :current-page="showsStore.currentPage"
      :has-next-page="showsStore.hasNextPage"
      @page-change="handlePageChange"
    />

    <section v-if="areShowsLoading" class="shows-grid">
      <div class="loading-container">
        <div class="loading-spinner"></div>
        <div class="loading-text">Loading shows...</div>
      </div>
    </section>
    
    <section v-else>
      <div class="shows-grid">
        <ShowInfoCard
          v-for="show in showsStore.paginatedShows"
          :key="show.id"
          :show="show"
          actionBannerText="View show details"
          @show-details="navigateToShow(show.id)"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.shows-page {
  margin: 0 auto;
  max-width: 1400px;
  padding: 1rem;
}

.controls-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.top-controls {
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.search-controls {
  align-items: center;
  display: flex;
  flex-shrink: 0;
  gap: 0.5rem;
}

.filters-panel {
  flex-grow: 1;
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
  
  .controls-container {
    align-items: stretch;
    flex-direction: column;
  }

  .search-controls {
    margin-bottom: 1rem;
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

.loading-container {
  align-items: center;
  display: flex;
  flex-direction: column;
  grid-column: 1 / -1; /* Spans all columns in the grid */
  justify-content: center;
  min-height: 300px;
  width: 100%;
}

.loading-spinner {
  animation: spin 1s linear infinite;
  border: 4px solid #f3f3f3;
  border-radius: 50%;
  border-top: 4px solid #3498db;
  height: 40px;
  margin-bottom: 1rem;
  width: 40px;
}

.loading-text {
  color: #666;
  font-size: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .loading-spinner {
    border-width: 3px;
    height: 32px;
    width: 32px;
  }

  .loading-text {
    font-size: 0.875rem;
  }
}
</style>