<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useShowsStore } from '@/modules/shows/stores/shows.store';
import { useCastStore } from '@/modules/cast/stores/cast.store';
import CastMemberOverview from '@/modules/cast/components/CastMemberOverview.vue';

const route = useRoute();
const castStore = useCastStore();
const showsStore = useShowsStore();

onMounted(async () => {
  if (!showsStore.selectedShow) {
    console.log('FETCHING SHOW');
    await showsStore.fetchShowById(Number(route.params.id));
  }
  await castStore.fetchCastByShowId(Number(route.params.id));
});
</script>

<template>
  <div class="show-overview-container">
    <div class="content-grid">
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
        <div v-for="castMember in castStore.selectedShowCast" :key="castMember.character.id">
          <CastMemberOverview :castMember="castMember" />
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.show-overview-container {
  padding: 1rem;
}

.content-grid {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: 1fr 1fr;
  margin: 0 auto;
  max-width: 75rem;
}

.card {
  background-color: #f0f0f0;
  border: 0.0625rem solid #ccc;
  border-radius: 0.5rem;
  padding: 1.25rem;
}

.main-content {
  display: flex;
  flex-direction: column;
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

@media (max-width: 48rem) {
  .content-grid {
    grid-template-columns: 1fr;
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
</style>
