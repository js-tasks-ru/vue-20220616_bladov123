<template>
  <ui-input v-bind="$attrs" v-model="proxyValue" :type="type">
    <template v-for="slotName in Object.keys($slots)" #[slotName]>
      <slot :name="slotName"></slot>
    </template>
  </ui-input>
</template>

<script>
import UiInput from './UiInput';
import { DateTime } from 'luxon';

export default {
  name: 'UiInputDate',

  components: { UiInput },

  inheritAttrs: false,

  props: {
    type: {
      type: String,
      default: 'date',
    },

    modelValue: {
      type: Number,
      default: null,
    },
  },

  emits: ['update:modelValue'],

  computed: {
    proxyValue: {
      get() {
        if (!this.modelValue) return '';

        if (this.type === 'date') {
          const utcDate = new Date(this.modelValue);
          const isoDate = utcDate.toISOString().split('T')[0];
          return isoDate;
        }

        if (this.type === 'time') {
          const utcDate = new Date(this.modelValue);
          const timeDate = utcDate.toISOString().split('T')[1].slice(0, 5);
          return timeDate;
        }

        if (this.type === 'datetime-local') {
          const utcDate = new Date(this.modelValue);
          const localDate = utcDate.toISOString().slice(0, 16);
          return localDate;
        }

        return '';
      },

      set(value) {
        let milisec = null;

        if (this.type === 'time') {
          let [hours, minute] = value.split(':');
          milisec = (+hours * 60 + +minute) * 60 * 1000;
        } else {
          milisec = DateTime.fromISO(value).toMillis() + 10800000;
        }

        this.$emit('update:modelValue', milisec);
      },
    },
  },
};
</script>
