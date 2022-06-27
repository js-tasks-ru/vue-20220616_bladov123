import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0,
      required: true,
    },
  },

  emits: ['update:count'],

  template: `
      <button
         type="button"
         :value="count"
         @click='$emit("update:count", +$event.target.value + 1)'
      >
        {{ count }}
      </button>`,
});
