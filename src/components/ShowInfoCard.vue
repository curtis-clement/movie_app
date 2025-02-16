<script setup lang="ts">
import type { ShowInfoCardData } from '@/models/model';

const props = defineProps<{
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
    </div>
    <div class="show-info-card-content">
      <h3 class="show-title">{{ props.show.name }}</h3>
      <div class="show-detail"><b>Rating:</b> {{ props.show.rating ? props.show.rating.average : 'N/A' }}</div>
      <div class="show-detail"><b>Status:</b> {{ props.show.status }}</div>
      <div class="show-detail"><b>Network:</b> {{ props.show.network ? props.show.network.name : 'N/A' }}</div>
      <div class="show-detail"><b>Genres:</b> {{ props.show.genres.join(', ') }}</div>
    </div>
    <div class="show-details-banner">
      Show Details
    </div>
  </div>
</template>

<style scoped>
.show-info-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.show-info-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.image-container {
  width: 100%;
  aspect-ratio: 3/4;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.show-info-card-content {
  padding: 1rem;
  flex-grow: 1; /* This will push the banner to the bottom */
}

.show-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.show-detail {
  margin: 0.5rem 0;
  color: #666;
  font-size: 0.875rem;
}

.show-details-banner {
  background-color: #3498db;
  color: white;
  padding: 0.75rem;
  text-align: center;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: auto; /* Ensures banner stays at bottom */
}

.show-details-banner:hover {
  background-color: #2980b9;
}
</style>