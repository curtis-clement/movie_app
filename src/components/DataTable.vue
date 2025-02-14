<script setup lang="ts">
import type { ShowTableData } from '@/models/model';
import { useRouter } from 'vue-router';

interface DataTableProps {
  headers: string[];
  data: ShowTableData[];
}

const props = defineProps<DataTableProps>();

const router = useRouter();

function navigateToHome() {
  router.push('/');
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
        <td>{{ row.name }}</td>
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