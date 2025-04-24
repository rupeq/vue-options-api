import { createApp } from 'vue';
import { createPinia } from 'pinia';

import { App } from './views';
import { router } from './router';

import './assets/reset.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia).use(router).mount(document.body);
