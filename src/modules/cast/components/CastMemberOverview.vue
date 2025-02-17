<script setup lang="ts">
import type { CastMember } from '@/modules/cast/models/cast.models';

defineProps<{
  castMember: CastMember;
}>();
</script>

<template>
  <div class="cast-member-overview">
    <h2>{{ castMember.character.name }}</h2>
    <img :src="castMember.character.image.medium" alt="Cast Member Image" />
    <div>
      <h3>{{ castMember.person.name }}</h3>
      <div>{{ castMember.person.country.name }}</div>
      <div>{{ castMember.person.birthday }}</div>
    </div>
  </div>
</template>

<style scoped>
.cast-member-overview {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>