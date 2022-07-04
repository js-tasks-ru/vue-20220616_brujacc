<template>
  <button @click="increment">{{ localCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',
  props: {
    count: {
      type: Number,
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
    count(newCount) {
      this.localCount = newCount;
    },
  },
  methods: {
    increment() {
      this.$emit('update:count', (this.localCount += 1));
    },
  },
};
</script>
