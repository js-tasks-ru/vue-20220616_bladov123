import { defineComponent } from './vendor/vue.esm-browser.js';
import { agendaItemIcons, agendaItemDefaultTitles } from './meetupService.js';

export default defineComponent({
  name: 'MeetupAgendaItem',

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  computed: {
    title() {
      if (!this.agendaItem.title) {
        let typeLectrue = this.agendaItem.type;
        return agendaItemDefaultTitles[typeLectrue];
      }

      return this.agendaItem.title;
    },

    lecture() {
      if (this.agendaItem.type === 'talk') {
        return true;
      }

      return false;
    },

    icons() {
      let typeLectrue = this.agendaItem.type;
      return `/assets/icons/icon-${agendaItemIcons[typeLectrue]}.svg`;
    },
  },

  template: `
    <div class="agenda-item">
      <div class="agenda-item__col">
        <img :src="icons" class="icon" alt="key" />
      </div>
      <div class="agenda-item__col">{{ agendaItem.startsAt }} - {{ agendaItem.endsAt }}</div>
      <div class="agenda-item__col">
        <h3 class="agenda-item__title"> {{ title }} </h3>
        <p  v-if="lecture" class="agenda-item__talk">
          <span> {{ agendaItem.speaker }} </span>
          <span class="agenda-item__dot"></span>
          <span class="agenda-item__lang">{{ agendaItem.language }}</span>
        </p>
        <p v-if="agendaItem.description"> {{ agendaItem.description }} </p>
      </div>
    </div>`,
});
