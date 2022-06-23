<template>
  <div class="toast" :class="`toast_${toast.status}`">
    <ui-icon class="toast__icon" :icon="icon" />
    <span>{{ toast.msg }}</span>
  </div>
</template>

<script>
import UiIcon from './UiIcon.vue';

export default {
  name: 'UiToast',

  components: { UiIcon },
  props: {
    toast: Object,
  },
  emits: ['removal'],
  computed: {
    icon() {
      return this.toast.status === 'success' ? 'check-circle' : 'alert-circle';
    },
  },
  mounted() {
    this.removeToastWithDelay(this.toast.lifetime);
  },
  methods: {
    removeToastWithDelay(delay) {
      setTimeout(() => this.$emit('removal'), delay);
    },
  },
};
</script>
