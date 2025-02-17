<script setup lang="ts">
import DefaultButton from '@/core/components/DefaultButton.vue';
import TextChip from '@/core/components/TextChip.vue';
import type { FilterOption } from '@/models/filter.model';

const props = defineProps<{
  selectedFilterName: string;
  filters: FilterOption[];
}>();

const emits = defineEmits(['toggle-filter', 'chip-click', 'clear-filters']);

function toggleFilter(filterName: string) {
  emits('toggle-filter', filterName);
}

function handleChipClick(filterName: string, option: string) {
  emits('chip-click', filterName, option);
}

function isOptionSelected(filterName: string, option: string) {
  return props.filters.find(f => f.filterName === filterName)?.selectedOptions.includes(option);
}

function clearFilters() {
  emits('clear-filters');
}
</script>

<template>
  <div class="filter-panel">
    <div class="filter-headers">
      <div
        v-for="filter in props.filters"
        :key="filter.filterName"
        class="filter-header"
        @click="toggleFilter(filter.filterName)"
      >
        {{ filter.filterName }}
        <span class="arrow" :class="{ 'arrow-down': props.selectedFilterName === filter.filterName }">
          ▼
        </span>
      </div>
      <DefaultButton @button-click="clearFilters">
        <template #text>Clear Filters</template>
      </DefaultButton>
    </div>

    <div v-if="props.selectedFilterName" class="filter-chips">
      <TextChip
        v-for="option in props.filters.find(f => f.filterName === props.selectedFilterName)?.options"
        :key="option"
        :text="option"
        :selected="isOptionSelected(props.selectedFilterName, option)"
        @emit-click="handleChipClick(props.selectedFilterName, option)"
      />
    </div>
  </div>
</template>

<style scoped>
.filter-panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}

.filter-headers {
  display: flex;
  gap: .5rem;
}

.filter-header {
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
}

.filter-header:hover {
  background-color: #e0e0e0;
}

.arrow {
  display: inline-block;
  font-size: .75rem;
  transform: rotate(-90deg);
  transition: transform 0.2s ease;
}

.arrow-down {
  transform: rotate(0deg);
}

.filter-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>