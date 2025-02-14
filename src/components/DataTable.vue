<script setup lang="ts">
import type { ShowTableData } from '@/models/model';
import { useShowsStore } from '@/stores/shows.store';
import { useRouter } from 'vue-router';

interface DataTableProps {
  headers: string[];
  data: ShowTableData[];
}

const props = defineProps<DataTableProps>();

const router = useRouter();
const showsStore = useShowsStore();

function navigateToHome() {
  router.push('/');
}

async function navigateToShow(showId: number) {
  await showsStore.fetchShowById(showId);
  router.push(`/show-overview/${showId}`);
}

</script>

<template>
  <button @click="navigateToHome">Back to Home</button>
  <table>
    <thead>
      <tr>
        <th v-for="header in props.headers" :key="header">
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in props.data" :key="row.id">
        <td @click="navigateToShow(row.id)">{{ row.name }}</td>
        <td>{{ row.rating.average }}</td>
        <td>{{ row.status }}</td>
        <td>{{ row.genres.join(' / ') }}</td>
        <td>{{ row.network ? row.network.name : 'N/A' }}</td>
        <td>{{ row.network ? row.network.country.name : 'N/A' }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>