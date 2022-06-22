import { createApp } from './vendor/vue.esm-browser.js';
import { defineComponent } from './vendor/vue.esm-browser.js';

let RootComponent = defineComponent({
  data() {
    return {
      count: 0,
    };
  },

  methods: {
    increaseCount() {
      this.count++;
    },
  },
});

let app = createApp(RootComponent);

let vm = app.mount('#app');
