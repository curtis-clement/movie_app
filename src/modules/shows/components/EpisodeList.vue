<script setup lang="ts">
import type { Episode } from '@/modules/episodes/models/episodes.model';
import { computed } from 'vue';

const props = defineProps<{
  episodes: Episode[];
}>();

const totalEpisodes = computed(() => props.episodes.length);
</script>

<template>
  <div class="episodes-list-container">
    <h2>Episodes: {{ totalEpisodes }}</h2>
    <div class="episodes-list">
      <div v-for="episode in episodes" :key="episode.id" class="episode-item">
        <div class="episode-image">
          <img 
            v-if="episode.image"
            :src="episode.image.medium" 
            :alt="episode.name"
          />
          <div v-else class="image-placeholder">
            No image
          </div>
        </div>
        <div class="episode-info">
          <h3 class="episode-name">{{ episode.name ? episode.name : 'N/A' }}</h3>
          <div class="episode-details">
            <span>Season {{ episode.season ? episode.season : 'N/A' }}</span>
            <span class="separator">•</span>
            <span>Episode {{ episode.number ? episode.number : 'N/A' }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.episodes-list-container {
  width: 100%;
}

.episodes-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.episode-item {
  align-items: center;
  background-color: white;
  border-radius: 0.5rem;
  display: flex;
  gap: 1rem;
  padding: 0.5rem;
}

.episode-image {
  border-radius: 50%;
  flex-shrink: 0;
  height: 100px;
  overflow: hidden;
  width: 100px;
}

.episode-image img {
  height: 100%;
  object-fit: cover;
  width: 100%;
}

.image-placeholder {
  align-items: center;
  background-color: #e0e0e0;
  color: #666;
  display: flex;
  font-size: 0.875rem;
  height: 100%;
  justify-content: center;
  width: 100%;
}

.episode-info {
  flex-grow: 1;
}

.episode-name {
  font-size: 1.125rem;
  margin: 0 0 0.5rem 0;
}

.episode-details {
  color: #666;
  font-size: 0.875rem;
}

.separator {
  margin: 0 0.5rem;
}

@media (max-width: 48rem) {
  .episode-image {
    height: 80px;
    width: 80px;
  }

  .episode-name {
    font-size: 1rem;
  }
}

@media (max-width: 30rem) {
  .episode-image {
    height: 60px;
    width: 60px;
  }
}
</style>
