import { createApp } from './vendor/vue.esm-browser.js';
import { defineComponent } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

let RootComponent = defineComponent({
  data() {
    return {
      meetupId: null,
      meetuTitle: null,
    };
  },

  watch: {
    meetupId() {
      fetchMeetupById(this.meetupId).then((meetup) => (this.meetuTitle = meetup.title));
    },
  },
});

let app = createApp(RootComponent);

let vm = app.mount('#app');
