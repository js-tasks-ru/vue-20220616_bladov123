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
      isError: false,
      errorMess: null,
    };
  },

  watch: {
    meetupId: {
      handler: function () {
        this.isLoaded = false;
        this.isError = false;
        fetchMeetupById(this.meetupId)
          .then((met) => {
            this.isLoaded = true;
            this.currentMeetupId = met;
          })
          .catch((err) => {
            this.isError = true;
            this.errorMess = err.message;
          });
      },
      immediate: true,
    },
  },

  template: `
    <div class="page-meetup">
      <meetup-view
            v-if="isLoaded"
            :meetup="currentMeetupId"
            >
      </meetup-view>

      <ui-container v-else-if="isError">
        <ui-alert > {{ errorMess }}</ui-alert>
      </ui-container>

      <ui-container v-else>
        <ui-alert>Загрузка...</ui-alert>
      </ui-container>
    </div>`,
});
