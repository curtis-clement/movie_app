<script setup lang="ts">
import type { ShowInfoCardData } from '@/models/shows.model';

const emit = defineEmits(['show-details']);

const props = defineProps<{
  actionBannerText: string;
  show: ShowInfoCardData;
}>();
</script>

<template>
  <div class="show-info-card">
    <div class="image-container">
      <img
        v-if="props.show.image"
        :src="props.show.image.medium"
        :alt="props.show.name"
        class="card-image"
      />
      <div v-else class="image-placeholder">
        Image not available
      </div>
    </div>

    <div class="show-info-card-content">
      <h3 class="show-title">{{ props.show.name }}</h3>
      <div class="show-detail"><b>Rating:</b> {{ props.show.rating ? props.show.rating : 'N/A' }}</div>
      <div class="show-detail"><b>Status:</b> {{ props.show.status }}</div>
      <div class="show-detail"><b>Network:</b> {{ props.show.network ? props.show.network.name : 'N/A' }}</div>
      <div class="show-detail"><b>Genres:</b> {{ props.show.genres.join(' / ') }}</div>
    </div>
    <div class="action-banner" @click="emit('show-details', props.show.id)">
      {{ props.actionBannerText }}
    </div>
  </div>
</template>

<style scoped>
.show-info-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  transition: transform 0.2s;
  width: 100%;
}

.show-info-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-4px);
}

.image-container {
  aspect-ratio: 3/4;
  overflow: hidden;
  width: 100%;
}

.image-placeholder {
  align-items: center;
  background-color: #e0e0e0;
  color: #668;
  display: flex;
  height: 100%;
  justify-content: center;
}

.card-image {
  height: 100%;
  object-fit: cover;
  width: 100%;
}

.show-info-card-content {
  flex-grow: 1;
  padding: 1rem;
}

.show-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.show-detail {
  color: #666;
  font-size: 0.875rem;
  margin: 0.5rem 0;
}

.action-banner {
  background-color: #3498db;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  margin-top: auto;
  padding: 0.75rem;
  text-align: center;
  transition: background-color 0.2s;
}

.action-banner:hover {
  background-color: #2980b9;
}
</style>