<template>
  <ui-input v-bind="$attrs" :modelValue="inputVal" :type="type" @change="onchange($event)">
    <template v-for="slotName in Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
    </template>
  </ui-input>
</template>

<script>
import UiInput from './UiInput';
import { format, addMinutes } from 'date-fns';

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
  data() {
    return {
      format,
      addMinutes,
    };
  },
  computed: {
    newDateUTC() {
      const date = new Date(this.modelValue);
      return addMinutes(date, date.getTimezoneOffset());
    },
    inputVal() {
      switch (this.type) {
        case 'time':
          return this.modelValue ? this.formatTime(this.newDateUTC) : '';
        case 'datetime-local':
          return this.modelValue ? this.formatDateTime(this.newDateUTC) : '';
        default:
          return this.modelValue ? this.formatDate(this.newDateUTC) : '';
      }
    },
  },
  methods: {
    onchange(event) {
      this.$emit('update:modelValue', event.target.valueAsNumber);
    },
    formatDate(date) {
      return format(date, 'yyyy-MM-dd');
    },
    formatTime(date) {
      const variant = this.$attrs.step && this.$attrs.step % 60 !== 0 ? 'HH:mm:ss' : 'HH:mm';
      return format(date, variant);
    },
    formatDateTime(date) {
      return format(date, "yyyy-MM-dd'T'HH:mm");
    },
  },
};
</script>
