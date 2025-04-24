import { createRouter, createWebHistory } from 'vue-router';

import { eventRoutes } from './events.routes';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...eventRoutes],
});
