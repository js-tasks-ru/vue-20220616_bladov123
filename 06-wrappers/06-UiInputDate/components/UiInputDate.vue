<template>
  <ui-input v-bind="$attrs" :type="type" :value="modelValue" @change="proxyChange">
    <template v-for="slotName in Object.keys($slots)" #[slotName]>
      <slot :name="slotName"></slot>
    </template>
  </ui-input>
</template>

<script>
import UiInput from './UiInput';
import dayjs from 'dayjs';

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
    },
  },

  emits: ['update:modelValue'],

  methods: {
    proxyChange($event) {
      let value = $event.target.valueAsNumber;
      let valueTwo = $event.target.value;

      let formatter = dayjs(value).format('YYYY-MM-DD')
      this.$emit('update:modelValue', value);
    },
  },
};
</script>
