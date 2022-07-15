<template>
  <fieldset class="agenda-item-form">
    <button type="button" class="agenda-item-form__remove-button" @click="$emit('remove')">
      <ui-icon icon="trash" />
    </button>

    <ui-form-group>
      <ui-dropdown
        title="Тип"
        :options="$options.agendaItemTypeOptions"
        name="type"
        :model-value="localAgenda.type"
        @update:model-value="updatingValue($event, 'type')"
      />
    </ui-form-group>

    <div class="agenda-item-form__row">
      <div class="agenda-item-form__col">
        <ui-form-group label="Начало">
          <ui-input
            type="time"
            placeholder="00:00"
            name="startsAt"
            :model-value="localAgenda.startsAt"
            @update:model-value="updatingValue($event, 'startsAt')"
          />
        </ui-form-group>
      </div>
      <div class="agenda-item-form__col">
        <ui-form-group label="Окончание">
          <ui-input
            type="time"
            placeholder="00:00"
            name="endsAt"
            :model-value="localAgenda.endsAt"
            @update:model-value="updatingValue($event, 'endsAt')"
          />
        </ui-form-group>
      </div>
    </div>

    <ui-form-group :label="label">
      <ui-input name="title" :model-value="localAgenda.title" @update:model-value="updatingValue($event, 'title')" />
    </ui-form-group>
    <ui-form-group v-if="agendaType === 'talk'" label="Докладчик">
      <ui-input
        name="speaker"
        :model-value="localAgenda.speaker"
        @update:model-value="updatingValue($event, 'speaker')"
      />
    </ui-form-group>
    <ui-form-group v-if="agendaType === 'talk' || agendaType === 'other'" label="Описание">
      <ui-input
        multiline
        name="description"
        :model-value="localAgenda.description"
        @update:model-value="updatingValue($event, 'description')"
      />
    </ui-form-group>
    <ui-form-group v-if="agendaType === 'talk'" label="Язык">
      <ui-dropdown
        title="Язык"
        :options="$options.talkLanguageOptions"
        name="language"
        :model-value="localAgenda.language"
        @update:model-value="updatingValue($event, 'language')"
      />
    </ui-form-group>
  </fieldset>
</template>

<script>
import UiIcon from './UiIcon';
import UiFormGroup from './UiFormGroup';
import UiInput from './UiInput';
import UiDropdown from './UiDropdown';

let difference = 0;

const agendaItemTypeIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

const agendaItemDefaultTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

const agendaItemTypeOptions = Object.entries(agendaItemDefaultTitles).map(([type, title]) => ({
  value: type,
  text: title,
  icon: agendaItemTypeIcons[type],
}));

const talkLanguageOptions = [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

export default {
  name: 'MeetupAgendaItemForm',

  agendaItemTypeOptions,
  talkLanguageOptions,

  components: { UiIcon, UiFormGroup, UiInput, UiDropdown },

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  emits: ['update:modelValue', 'remove', 'update:agendaItem'],

  data() {
    return {
      localAgenda: { ...this.agendaItem },
    };
  },

  computed: {
    agendaType() {
      return this.localAgenda.type;
    },

    startsAt() {
      return this.localAgenda.startsAt;
    },

    label() {
      if (this.localAgenda.type === 'talk') return 'Тема';

      if (this.localAgenda.type === 'other') return 'Заголовок';

      return 'Нестандартный текст (необязательно)';
    },
  },

  watch: {
    startsAt(newValue, oldValue) {
      if (!/([0-1]\d|2[0-3]):[0-5]\d/.test(newValue)) {
        return;
      }

      const timeToMinutes = (time) => {
        const [h, m] = time.split(':').map((x) => parseInt(x, 10));
        return h * 60 + m;
      };
      const newMinutes = timeToMinutes(newValue);
      const oldMinutes = timeToMinutes(oldValue);
      const oldEndsAtMinutes = timeToMinutes(this.localAgenda.endsAt);

      const deltaMinutes = newMinutes - oldMinutes;

      const newEndsAtMinutes = (oldEndsAtMinutes + deltaMinutes + 24 * 60) % (24 * 60);

      const hours = Math.floor(newEndsAtMinutes / 60)
        .toString()
        .padStart(2, '0');
      const minutes = Math.floor(newEndsAtMinutes % 60)
        .toString()
        .padStart(2, '0');
      this.localAgenda.endsAt = `${hours}:${minutes}`;
    },
  },

  methods: {
    updatingValue(event, key) {
      this.localAgenda[key] = event;
      this.$emit('update:agendaItem', { ...this.localAgenda });
    },
  },
};
</script>

<style scoped>
.agenda-item-form {
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  position: relative;
  padding: 20px 10% 0 16px;
}

.agenda-item-form__remove-button {
  position: absolute;
  top: 4px;
  right: 0;
  box-shadow: none;
  border: none;
  background-color: transparent;
  outline: none;
  padding: 4px;
  cursor: pointer;
  transition: 0.2s opacity;
}

.agenda-item-form__remove-button:hover {
  opacity: 0.6;
}

.agenda-item-form__row {
  display: flex;
  flex-direction: column;
}

.agenda-item-form__col + .agenda-item-form__col {
  margin-top: 16px;
}

.agenda-item-form__col:first-child {
  margin-left: 0;
}

@media all and (min-width: 992px) {
  .agenda-item-form {
    padding: 28px 25% 4px 24px;
  }

  .agenda-item-form__remove-button {
    top: 20px;
    right: 20px;
  }

  .agenda-item-form__row {
    flex-direction: row;
    justify-content: space-between;
    margin: 0 -12px;
  }

  .agenda-item-form__col {
    flex: 1 1 auto;
    padding: 0 12px;
  }

  .agenda-item-form__col + .agenda-item-form__col {
    margin-top: 0;
  }

  .agenda-item-form__col:first-child {
    margin-left: 0;
  }
}
</style>
