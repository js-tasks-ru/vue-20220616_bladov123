import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      required: true,
    },
  },
  emits: ['increasCount'],

  template: `
      <button
         type="button"
         @click='$emit("increasCount")'
      >
        {{ count }}
      </button>`,
});
