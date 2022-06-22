<template>
  <div class="toasts">
    <ui-toast v-for="toast in toasts" :key="toast.id" :toast="toast" @removal="(id) => removeToast(id)"></ui-toast>
  </div>
</template>

<script>
import UiToast from './UiToast.vue';

export default {
  name: 'TheToaster',

  components: { UiToast },

  data() {
    return {
      toasts: [],
      lifeTime: 5000,
    };
  },

  methods: {
    getToastOptions(status) {
      return { status: status, lifetime: this.lifeTime, id: Date.now().toString() };
    },
    success(message) {
      this.toasts.push({ msg: message, ...this.getToastOptions('success') });
    },
    error(message) {
      this.toasts.push({ msg: message, ...this.getToastOptions('error') });
    },
    removeToast(toastId) {
      this.toasts = this.toasts.filter((elem) => elem.id !== toastId);
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
