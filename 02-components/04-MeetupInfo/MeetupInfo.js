import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupInfo',

  props: {
    organizer: {
      type: String,
      required: true,
    },

    place: {
      type: String,
      required: true,
    },

    date: {
      type: Number,
      required: true,
    },
  },

  computed: {
    dataEvent() {
      let ruDate = new Date(this.date).toLocaleDateString();

      if (ruDate.startsWith('0')) {
        ruDate = ruDate.slice(1);
      }

      ruDate = ruDate.split('.');

      const mounth = {
        12: 'December',
        '01': 'January',
        '02': 'February',
        '03': 'March',
        '04': 'April',
        '05': 'May',
        '06': 'June',
        '07': 'July',
        '08': 'August',
        '09': 'September',
        10: 'October',
        11: 'November',
      };
      ruDate.splice(1, 1, mounth[ruDate[1]]);

      [ruDate[0], ruDate[1]] = [ruDate[1], ruDate[0]];

      ruDate[1] += ',';
      return ruDate.join(' ') + ' г.';
    },

    dateTimeNumer() {
      return new Date(this.date).toLocaleDateString().split('.').reverse().join('-');
    },
  },

  template: `
    <ul class="meetup-info">
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-user.svg" />
        {{ organizer  }}
      </li>
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-map.svg" />
        {{ place }}
      </li>
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-cal-lg.svg" />
        <time :datetime="dateTimeNumer">{{ dataEvent }}</time>
      </li>
    </ul>`,
});
