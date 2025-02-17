<script setup lang="ts">
const props = withDefaults(defineProps<{
  disabled?: boolean;
}>(), {
  disabled: false,
});

const emit = defineEmits(['button-click']);
</script>

<template>
  <button
    class="default-button"
    :disabled="props.disabled"
    @click="emit('button-click')"
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
  margin-right: 0.5rem;
  padding: 0.5rem 1rem;
  transition: background-color 0.2s;
}

.default-button:hover {
  background-color: #2980b9;
}

.button-content {
  align-items: center;
  display: flex;
  font-size: .8rem;
  gap: 0.5rem;
}

.default-button:disabled {
  opacity: 0.6;
  pointer-events: none;
}
</style>