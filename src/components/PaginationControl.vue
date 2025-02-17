<script setup lang="ts">
import { PaginationDirection } from '@/models/helpers.model';

const props = defineProps<{
  currentPage: number;
  hasNextPage: boolean;
}>();

const emit = defineEmits(['page-change']);

function changePage(direction: PaginationDirection) {
  emit('page-change', direction === PaginationDirection.NEXT ? props.currentPage + 1 : props.currentPage - 1);
}
</script>

<template>
  <div class="pagination-control">
    <button 
      class="pagination-button"
      :disabled="currentPage === 1"
      @click="changePage(PaginationDirection.PREVIOUS)"
    >
      &lt;
    </button>
    <span class="page-indicator">Page {{ currentPage }}</span>
    <button 
      class="pagination-button"
      :disabled="!hasNextPage"
      @click="changePage(PaginationDirection.NEXT)"
    >
      &gt;
    </button>
  </div>
</template>

<style scoped>
.pagination-control {
  align-items: center;
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin: 2rem 0;
}

.pagination-button {
  background-color: white;
  border: 1px solid #3498db;
  border-radius: 4px;
  color: #3498db;
  cursor: pointer;
  padding: 0.5rem 1rem;
  transition: background-color 0.2s;
}

.pagination-button:hover:not(:disabled) {
  background-color: #3498db;
  color: white;
}

.pagination-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.page-indicator {
  font-weight: 600;
}
</style>
