<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useShowsStore } from '@/stores/shows.store';

const route = useRoute();
const router = useRouter();
const showsStore = useShowsStore();

function navigateToHome() {
  router.push('/');
}

onMounted(() => {
  if (!showsStore.selectedShow) {
    showsStore.fetchShowById(Number(route.params.id));
  }
});
</script>

<template>
  <div class="show-overview-container">
    <div v-if="showsStore.selectedShow">
      <div class="show-title">
        <h1>{{ showsStore.selectedShow.name }}</h1>
      </div>

      <section class="show-overview">
        <img :src="showsStore.selectedShow.image.medium" alt="Show Image" />
        <div>
          <div class="info-item"><b>Network:</b> {{ showsStore.selectedShow.network.name }}</div>
          <div class="info-item"><b>Country:</b> {{ showsStore.selectedShow.network.country.name }}</div>
          <div class="info-item"><b>Rating:</b> {{ showsStore.selectedShow.rating.average }}</div>
          <div class="info-item"><b>Genres:</b> {{ showsStore.selectedShow.genres }}</div>
          <div class="info-item"><b>Status:</b> {{ showsStore.selectedShow.status }}</div>
          <div class="info-item"><b>Premiered:</b> {{ showsStore.selectedShow.premiered }}</div>
          <div class="info-item"><b>Ended:</b> {{ showsStore.selectedShow.ended }}</div>
          <div class="info-item"><b>Language:</b> {{ showsStore.selectedShow.language }}</div>
        </div>
      </section>
      <div v-html="showsStore.selectedShow.summary" class="show-summary"></div>
      <button @click="navigateToHome">Back to Home</button>
    </div>
  </div>
</template>

<style scoped>
.show-overview-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.show-title {
  display: flex;
  justify-content: center;
}

.show-overview {
  display: flex;
  justify-content: space-around;
  margin-bottom: 16px;
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f0f0f0;
  width: 35%;
}

img {
  border-radius: 8px;
  margin-right: 8px;
}

.show-summary {
  margin-bottom: 16px;
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f0f0f0;
  width: 50%;
}

.info-item {
  margin-bottom: 8px;
}
</style>
