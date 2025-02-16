<script setup lang="ts">

const props = withDefaults(defineProps<{
  disabled?: boolean;
  placeholder: string;
  modelValue: string;
}>(), {
  disabled: false,
});

const emit = defineEmits(['update:modelValue']);

</script>

<template>
  <input 
    type="text" 
    :placeholder="props.placeholder" 
    :value="props.modelValue" 
    :disabled="props.disabled"
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
  margin-right: 0.5rem;
}

input:disabled {
  background-color: #f0f0f0;
  cursor: not-allowed;
  opacity: 0.6;
}
</style>