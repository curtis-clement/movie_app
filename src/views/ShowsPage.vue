<script setup lang="ts">
import DataTable from '@/components/DataTable.vue';
import { useShowsStore } from '@/stores/shows.store';
import { ShowTableHeaders } from '@/models/model';

const showsStore = useShowsStore();

const headers = Object.values(ShowTableHeaders);

</script>

<template>
  <DataTable :headers="headers" :data="showsStore.showTableData" />
</template>