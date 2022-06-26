import { defineComponent } from './vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from './meetupService.js';
import MeetupView from '../06-MeetupView/MeetupView.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      currentMeetupId: null,
      isLoaded: false,
      loading: true,
      errorMess: null,
    };
  },

  watch: {
    meetupId() {
      this.loading = true;
      this.isLoaded = false;

      fetchMeetupById(this.meetupId)
        .then((met) => {
          this.loading = false;
          this.isLoaded = true;
          this.currentMeetupId = met;
        })
        .catch((err) => {
          this.loading = false;
          this.isLoaded = false;
          this.errorMess = err.message;
        });
    },
  },

  created() {
    fetchMeetupById(this.meetupId)
      .then((met) => {
        this.loading = false;
        this.isLoaded = true;
        this.currentMeetupId = met;
      })
      .catch((err) => (this.errorMess = err.message));
  },

  template: `
    <div class="page-meetup">
      <!-- meetup view -->
      <meetup-view
            v-if="isLoaded"
            :meetup="currentMeetupId"
            >
      </meetup-view>

      <ui-container v-else-if="loading">
        <ui-alert>Загрузка...</ui-alert>
      </ui-container>

      <ui-container v-else>
        <ui-alert > {{ errorMess }}</ui-alert>
      </ui-container>
    </div>`,
});
