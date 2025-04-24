<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

import type { EventType } from '@/api/events';

export default defineComponent({
  name: 'EventCard',
  props: {
    event: {
      type: Object as PropType<EventType>,
      required: true,
    },
  },
});
</script>

<template>
  <li>
    <p>{{ event.id }}</p>
  </li>
</template>

<style scoped></style>
