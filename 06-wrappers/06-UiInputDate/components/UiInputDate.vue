<template>
  <ui-input v-bind="$attrs" :type="type" :model-value="proxyValue" @input="handleInput">
    <template v-for="slotName in Object.keys($slots)" #[slotName]>
      <slot :name="slotName"></slot>
    </template>
  </ui-input>
</template>

<script>
import UiInput from './UiInput';

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
    proxyValue() {
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
  },

  methods: {
    handleInput($event) {
      this.$emit('update:modelValue', $event.target.value === '' ? null : $event.target.valueAsNumber);
    },
  },
};
</script>
