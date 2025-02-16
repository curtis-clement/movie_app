<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits(['update:modelValue']);

</script>

<template>
  <input 
    type="text" 
    placeholder="Search" 
    :value="props.modelValue" 
    @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)" 
  />
</template>

<style scoped>
input {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem;
  width: 10rem;
  min-width: 150px;
  margin-left: 1rem;
  margin-right: 1rem;
}
</style>