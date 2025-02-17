<script setup lang="ts">
const props = withDefaults(defineProps<{
  disabled?: boolean;
}>(), {
  disabled: false,
});

const emit = defineEmits(['buttonClick']);
</script>

<template>
  <button
    class="default-button"
    :disabled="props.disabled"
    @click="emit('buttonClick')"
  >
    <div class="button-content">
      <slot name="text"/>
    </div>
  </button>
</template>

<style scoped>
.default-button {
  background-color: #3498db;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  padding: 0.5rem 1rem;
  transition: background-color 0.2s;
  margin-right: 0.5rem;
}

.default-button:hover {
  background-color: #2980b9;
}

.button-content {
  display: flex;
  align-items: center;
  font-size: .8rem;
  gap: 0.5rem;
}

.default-button:disabled {
  opacity: 0.6;
  pointer-events: none;
}
</style>