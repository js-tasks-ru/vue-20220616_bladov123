<template>
  <button @click="updateCount">
    {{ localCount }}
  </button>
</template>

<script>
export default {
  name: 'CounterButton',

  props: {
    count: {
      default: 0,
    },
  },

  emits: ['update:count'],

  data() {
    return {
      localCount: this.count,
    };
  },

  watch: {
    count(value) {
      this.localCount = value;
    },
  },

  methods: {
    updateCount() {
      this.$emit('update:count', ++this.localCount);
    },
  },
};
</script>
