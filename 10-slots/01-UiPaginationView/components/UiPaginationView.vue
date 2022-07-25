<template>
  <div class="pagination-container">
    <template v-for="n in perPage">
      <slot :item="items[pages + n - 1]" />
    </template>
  </div>
</template>

<script>
export default {
  name: 'UiPaginationView',

  props: {
    page: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },
    perPage: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },
    items: {
      type: Array,
      required: true,
    },
  },

  computed: {
    pages() {
      let lastElem = this.page * this.perPage;
      let firstElem = lastElem - this.perPage;
      return firstElem;
    },
  },
};
</script>

<style></style>
