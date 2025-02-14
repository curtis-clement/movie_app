import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import ShowsPage from '@/views/ShowsPage.vue';
import ShowOverview from '@/views/ShowOverview.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomePage,
    },
    {
      path: '/shows',
      component: ShowsPage,
    },
    {
      path: '/show-overview/:id',
      component: ShowOverview,
    },
  ],
})

export default router
