import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupCover',

  props: {
    title: {
      type: String,
      required: false,
    },

    image: {
      type: String,
      required: false,
    },
  },

  computed: {
    imgObj() {
      if (this.image) {
        return {
          '--bg-url': `url('${this.image}')`,
        };
      }

      return {};
    },
  },

  template: `
    <div class="meetup-cover" :style="imgObj">
        <h1 class="meetup-cover__title">{{ title }}</h1>
    </div>`,
});
