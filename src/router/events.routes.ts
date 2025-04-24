import type { RouteRecordRaw } from 'vue-router';

export const eventRoutes: Array<RouteRecordRaw> = [
  {
    path: '/events',
    name: 'eventList',
    component: () => import('@/views/events/EventsView.vue'),
  },
  {
    path: '/events/:id',
    name: 'event',
    component: () => import('@/views/events/EventView.vue'),
    beforeEnter: (to, _, next) => {
      const id = to.params.id;

      if (Array.isArray(id)) {
        next({ name: 'eventList', replace: true });
        return;
      }

      const parsed = parseInt(id, 10);

      if (Number.isNaN(parsed)) {
        next({ name: 'eventList', replace: true });
        return;
      }

      next();
    },
  },
];
