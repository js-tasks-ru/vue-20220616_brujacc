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
    newDate() {
      return new Date(this.modelValue);
    },
    inputVal() {
      switch (this.type) {
        case 'time':
          return this.modelValue ? this.formatTime(this.newDate) : '';
        case 'datetime-local':
          return this.modelValue ? this.formatDateTime(this.newDate) : '';
        default:
          return this.modelValue ? this.formatDate(this.newDate) : '';
      }
    },
  },
  methods: {
    onchange(event) {
      this.$emit('update:modelValue', event.target.valueAsNumber);
    },
    formatDate(date) {
      return format(addMinutes(date, date.getTimezoneOffset()), 'yyyy-MM-dd');
    },
    formatTime(date) {
      const variant = this.$attrs.step && this.$attrs.step % 60 !== 0 ? 'HH:mm:ss' : 'HH:mm';
      return format(addMinutes(date, date.getTimezoneOffset()), variant);
    },
    formatDateTime(date) {
      return format(addMinutes(date, date.getTimezoneOffset()), "yyyy-MM-dd'T'HH:mm");
    },
  },
};
</script>
