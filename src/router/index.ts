import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/core/views/HomePage.vue';
import ShowsPage from '@/modules/shows/views/ShowsPage.vue';
import ShowOverview from '@/modules/shows/views/ShowOverview.vue';
import { Routes } from '@/models/routes.model';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: Routes.HOME,
      component: HomePage,
    },
    {
      path: Routes.SHOWS,
      component: ShowsPage,
    },
    {
      path: `${Routes.SHOW_OVERVIEW}/:id`,
      component: ShowOverview,
    },
  ],
})

export default router
