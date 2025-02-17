<script setup lang="ts">
import type { CastMember } from '@/modules/cast/models/cast.models';

defineProps<{
  castMember: CastMember;
}>();
</script>

<template>
  <div class="cast-member-card">
    <div class="image-container">
      <img 
        v-if="castMember.character.image"
        :src="castMember.character.image.medium" 
        :alt="castMember.character.name" 
        class="card-image"
      />
      <div v-else class="image-placeholder">
        Image not available
      </div>
    </div>
    
    <div class="card-content">
      <h3 class="character-name">{{ castMember.character.name }}</h3>
      <div class="info-item">
        <b>Actor:</b> {{ castMember.person.name }}
      </div>
      <div class="info-item">
        <b>From:</b> {{ castMember.person.country?.name || 'N/A' }}
      </div>
      <div class="info-item">
        <b>Birthday:</b> {{ castMember.person.birthday || 'N/A' }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.cast-member-card {
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

.cast-member-card:hover {
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
  color: #666;
  display: flex;
  height: 100%;
  justify-content: center;
}

.card-image {
  height: 100%;
  object-fit: cover;
  width: 100%;
}

.card-content {
  flex-grow: 1;
  padding: 1rem;
}

.character-name {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.info-item {
  color: #666;
  font-size: 0.875rem;
  margin: 0.5rem 0;
}
</style>