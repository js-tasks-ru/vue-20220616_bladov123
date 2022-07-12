<template>
  <ui-input v-bind="$attrs" :type="type" :value="proxyValue" @change="proxyChange">
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
      if (this.type === 'date') {
        const utcDate = new Date(this.modelValue);
        const isoDate = utcDate.toISOString().split('T')[0];
        return isoDate;
      }
      return this.modelValue;
    },
  },

  methods: {
    proxyChange($event) {
      let value = $event.target.valueAsNumber;

      this.$emit('update:modelValue', value);
    },
  },
};
</script>
