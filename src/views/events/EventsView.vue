<script lang="ts">
import { defineComponent } from 'vue';

import { EventList } from '@/components/events';
import { getEvents, type EventType } from '@/api/events';

type Data = {
  events: EventType[] | null;
  error: string | null;
  isLoading: boolean;
  abortController: AbortController | null;
};

export default defineComponent({
  name: 'EventsView',
  data(): Data {
    return {
      events: null,
      error: null,
      isLoading: false,
      abortController: null,
    };
  },
  methods: {
    async fetchEvents() {
      this.abortController?.abort();

      this.abortController = new AbortController();
      this.isLoading = true;

      const data = await getEvents(this.abortController.signal);

      if (this.abortController.signal.aborted) {
        return;
      }

      if ('error' in data) {
        this.error = data.error;
      } else {
        this.events = data.events;
      }

      this.isLoading = false;
    },
  },
  async created() {
    await this.fetchEvents();
  },
  beforeUnmount() {
    this.abortController?.abort();
  },
  components: {
    EventList,
  },
});
</script>

<template>
  <EventList v-if="Array.isArray(events)" :events="events" />
  <p v-if="isLoading">Loading...</p>
  <p v-if="error" class="error-message">
    {{ error }}
  </p>
</template>

<style scoped>
.error-message {
  color: red;
}
</style>
