import type { App } from "vue";

import Zlider from './Zlider.vue';

export default {
  install(app: App) {
    app.component('Zlider', Zlider);
  }
};
