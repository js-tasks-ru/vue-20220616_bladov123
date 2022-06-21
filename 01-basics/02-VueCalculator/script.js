import { createApp } from './vendor/vue.esm-browser.js';
import { defineComponent } from './vendor/vue.esm-browser.js';

let RootComponent = defineComponent({
  data() {
    return {
      valueOne: '',
      valueTwo: '',
      picked: '',
    };
  },

  computed: {
    result() {
      switch (this.picked) {
        case 'sum':
          return this.valueOne + this.valueTwo;
        case 'subtract':
          return this.valueOne - this.valueTwo;
        case 'multiply':
          return this.valueOne * this.valueTwo;
        case 'divide':
          return this.valueOne / this.valueTwo;
      }

      return '';
    },
  },
});

let app = createApp(RootComponent);

let vm = app.mount('#app');
