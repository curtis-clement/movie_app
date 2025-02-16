<script setup lang="ts">
const props = withDefaults(defineProps<{
  disabled?: boolean;
  selected?: boolean;
  text: string;
}>(), {
  disabled: false,
  selected: false,
  text: '',
});

const emit = defineEmits(['click']);

function emitClick() {
  if (!props.disabled) {
    emit('click');
  }
}
</script>

<template>
  <div 
    class="text-chip" 
    :class="{ 'text-chip-selected': props.selected, 'text-chip-disabled': props.disabled }"
    @click="emitClick"
  >
    {{ props.text }}
  </div>
</template>

<style scoped>
.text-chip {
  display: inline-flex;
  align-items: center;
  border-radius: 8px;
  padding: .25rem .5rem;
  cursor: pointer;
  background-color: #e0e0e0;
  color: #575757;
}

.text-chip-selected {
  background-color: #a0f794;
  color: #0a5201;
}

.text-chip-disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>