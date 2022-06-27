<template>
  <ui-input v-bind="$attrs" v-model="modelValueProxy" :type="type" @change="onchange($event)">
    <template v-for="slotName in Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
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
    newDate() {
      return new Date(this.modelValue);
    },
    modelValueProxy: {
      get() {
        switch (this.type) {
          case 'time':
            return this.modelValue ? this.formatDate(this.newDate) : '';
          case 'datetime-local':
            return this.modelValue ? this.formatDateTime(this.newDate) : '';
          default:
            return this.modelValue ? new Date(this.modelValue).toISOString().substr(0, 10) : '';
        }
      },
      set(value) {
        this.$emit('update:modelValue', value.valueAsNumber);
      },
    },
  },
  methods: {
    onchange(event) {
      this.$emit('update:modelValue', event.target.valueAsNumber);
    },
    padTo2Digits(num) {
      return num.toString().padStart(2, '0');
    },
    formatDate(date) {
      const hours = date.getUTCHours();
      const minutes = date.getUTCMinutes();
      const seconds = date.getSeconds();
      return this.$attrs.step && this.$attrs.step % 60 !== 0
        ? `${this.padTo2Digits(hours)}:${this.padTo2Digits(minutes)}:${this.padTo2Digits(seconds)}`
        : `${this.padTo2Digits(hours)}:${this.padTo2Digits(minutes)}`;
    },
    formatDateTime(date) {
      return (
        [date.getFullYear(), this.padTo2Digits(date.getUTCMonth() + 1), this.padTo2Digits(date.getUTCDate())].join(
          '-',
        ) +
        'T' +
        [this.padTo2Digits(date.getUTCHours()), this.padTo2Digits(date.getUTCMinutes())].join(':')
      );
    },
  },
};
</script>
