<template>
  <div class="pagination-container">
    <slot v-for="item in currentItems" :item="item" />
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
    currentItems() {
      const startInd = (this.page - 1) * this.perPage;
      return this.items.slice(startInd, startInd + this.perPage);
    },
  },
};
</script>

<style></style>
