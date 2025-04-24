<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

import type { EventType } from '@/api/events';

import EventCard from './EventCard.vue';

export default defineComponent({
  name: 'EventList',
  props: {
    events: {
      type: Object as PropType<EventType[]>,
      required: true,
    },
  },
  components: {
    EventCard,
  },
});
</script>

<template>
  <ul v-if="events.length > 0">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </ul>
  <p v-else>Sorry, but there are no templates yet.</p>
</template>

<style scoped></style>
