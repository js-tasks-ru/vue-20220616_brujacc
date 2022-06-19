import { createApp } from './vendor/vue.esm-browser.js';

createApp({
  data() {
    return {
      arg1: 0,
      arg2: 0,
      operator: 'sum',
    };
  },
  computed: {
    result() {
      switch (this.operator) {
        case 'sum':
          return this.arg1 + this.arg2;
        case 'subtract':
          return this.arg1 - this.arg2;
        case 'multiply':
          return this.arg1 * this.arg2;
        case 'divide':
          return this.arg1 / this.arg2;
        default:
          return '';
      }
    },
  },
}).mount('#app');
