<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useShowsStore } from '@/modules/shows/stores/shows.store';
import { useCastStore } from '@/modules/cast/stores/cast.store';
import CastMemberOverview from '@/modules/cast/components/CastMemberOverview.vue';
import { useEpisodesStore } from '@/modules/episodes/stores/episodes.store';
import EpisodeList from '@/modules/shows/components/EpisodeList.vue';

const route = useRoute();
const castStore = useCastStore();
const showsStore = useShowsStore();
const episodesStore = useEpisodesStore();

onMounted(async () => {
  if (!showsStore.selectedShow) {
    await showsStore.fetchShowById(Number(route.params.id));
  }
  await castStore.fetchCastByShowId(Number(route.params.id));
  await episodesStore.fetchEpisodesByShowId(Number(route.params.id));
});
</script>

<template>
  <div class="show-overview-container">
    <div class="content-grid">
      <div class="left-column">
        <section v-if="showsStore.selectedShow" class="main-content card">
          <div class="show-title">
            <h1>{{ showsStore.selectedShow.name }}</h1>
          </div>

          <section class="show-overview">
            <img :src="showsStore.selectedShow.image.medium" alt="Show Image" />
            <div>
              <div class="info-item"><b>Network:</b> {{ showsStore.selectedShow.network.name }}</div>
              <div class="info-item"><b>Country:</b> {{ showsStore.selectedShow.network.country.name }}</div>
              <div class="info-item"><b>Rating:</b> {{ showsStore.selectedShow.rating.average }}</div>
              <div class="info-item"><b>Genres:</b> {{ showsStore.selectedShow.genres.join(' / ') }}</div>
              <div class="info-item"><b>Status:</b> {{ showsStore.selectedShow.status }}</div>
              <div class="info-item"><b>Premiered:</b> {{ showsStore.selectedShow.premiered }}</div>
              <div class="info-item"><b>Ended:</b> {{ showsStore.selectedShow.ended }}</div>
              <div class="info-item"><b>Language:</b> {{ showsStore.selectedShow.language }}</div>
            </div>
          </section>

          <section class="show-summary">
            <h3>Summary</h3>
            <div v-html="showsStore.selectedShow.summary"></div>
          </section>
        </section>

        <section class="cast-section card">
          <h2>Cast</h2>
          <div v-if="castStore.isCastLoading" class="loading-container">
            <div class="loading-spinner"></div>
            <div class="loading-text">Loading cast...</div>
          </div>
          <div v-else class="cast-container">
            <div class="cast-grid">
              <div v-for="castMember in castStore.selectedShowCast" :key="castMember.character.id">
                <CastMemberOverview :castMember="castMember" />
              </div>
            </div>
          </div>
        </section>
      </div>

      <section class="episodes-section card">
        <div v-if="episodesStore.areEpisodesLoading" class="loading-container">
          <div class="loading-spinner"></div>
          <div class="loading-text">Loading episodes...</div>
        </div>
        <EpisodeList v-else :episodes="episodesStore.episodes" />
      </section>
    </div>
  </div>
</template>

<style scoped>
.show-overview-container {
  padding: 1rem;
}

.content-grid {
  align-items: start;
  display: grid;
  gap: 1.25rem;
  grid-template-columns: 1fr 1fr;
  margin: 0 auto;
  max-width: 75rem;
}

.left-column {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.card {
  background-color: #f0f0f0;
  border: 0.0625rem solid #ccc;
  border-radius: 0.5rem;
  height: fit-content;
  padding: 1.25rem;
}

.episodes-section {
  position: sticky;
  top: 1.25rem;
  max-height: calc(100vh - 2.5rem);
  overflow-y: auto;
}

.show-title {
  margin-bottom: 1.25rem;
}

.show-overview {
  display: flex;
  gap: 1rem;
}

img {
  border-radius: 0.5rem;
  height: auto;
  max-width: 100%;
}

.show-summary {
  margin-top: .5rem;
}

.info-item {
  margin-bottom: 0.5rem;
}

.cast-container {
  max-height: calc(((100vw - 2rem) / 6) * 4 + 2.5rem);
  overflow-y: auto;
  padding-right: 0.5rem;
}

.cast-container::-webkit-scrollbar {
  width: 8px;
}

.cast-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.cast-container::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.cast-container::-webkit-scrollbar-thumb:hover {
  background: #666;
}

.cast-grid {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(3, 1fr);
}

.loading-container {
  align-items: center;
  display: flex;
  flex-direction: column;
  grid-column: 1 / -1;
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

.episodes-container {
  margin-top: 1.25rem;
  max-height: calc(((100vw - 2rem) / 6) * 4 + 2.5rem);
  overflow-y: auto;
  padding-right: 0.5rem;
}

.episodes-container::-webkit-scrollbar {
  width: 8px;
}

.episodes-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.episodes-container::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.episodes-container::-webkit-scrollbar-thumb:hover {
  background: #666;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 64rem) and (min-width: 48rem) {
  .show-overview {
    align-items: center;
    flex-direction: column;
  }

  .show-overview img {
    margin-bottom: 1rem;
    max-width: 300px;
  }

  .show-overview > div {
    width: 100%;
    text-align: left;
  }
}

@media (max-width: 48rem) {
  .content-grid {
    grid-template-columns: 1fr;
  }

  .episodes-section {
    position: static;
    max-height: none;
  }

  .show-overview {
    align-items: center;
    flex-direction: column;
    text-align: center;
  }

  img {
    margin-bottom: 1rem;
  }
}

@media (max-width: 30rem) {
  .cast-container {
    max-height: calc(((100vw - 2rem) / 2) * 4 + 2.5rem);
  }

  .cast-grid {
    grid-template-columns: 1fr;
  }
}
</style>
