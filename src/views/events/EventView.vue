<script lang="ts">
import { defineComponent } from 'vue';

import { getEvent, type EventType } from '@/api/events';

type Data = {
  event: EventType | null;
  error: string | null;
  isLoading: boolean;
  abortController: AbortController | null;
};

export default defineComponent({
  name: 'EventView',
  data(): Data {
    return {
      event: null,
      error: null,
      isLoading: false,
      abortController: null,
    };
  },
  computed: {
    eventId(): number {
      return parseInt(this.$route.params.id as string, 10);
    },
  },
  methods: {
    async fetchEvent(id: number) {
      this.abortController?.abort();

      this.abortController = new AbortController();
      this.isLoading = true;

      const data = await getEvent(id, this.abortController.signal);

      if (this.abortController.signal.aborted) {
        return;
      }

      if ('error' in data) {
        this.error = data.error;
      } else {
        this.event = data.event;
      }

      this.isLoading = false;
    },
  },
  watch: {
    eventId: {
      async handler(next, prev) {
        if (next === prev) {
          return;
        }

        await this.fetchEvent(next);
      },
    },
  },
  async created() {
    await this.fetchEvent(this.eventId);
  },
  beforeUnmount() {
    this.abortController?.abort();
  },
});
</script>

<template>
  <pre>
    {{ isLoading ? 'Loading...' : JSON.stringify(event) }}
  </pre>
</template>

<style scoped>
.error-message {
  color: red;
}
</style>
