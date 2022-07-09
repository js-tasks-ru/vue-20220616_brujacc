<script lang="jsx">
import { compile } from 'vue';

export default {
  name: 'TemplateRenderer',
  props: {
    template: {
      type: String,
      required: true,
    },

    bindings: {
      type: Object,
      default: () => ({}),
    },

    components: {
      type: [Object, Array],
      default: () => [],
    },
  },

  watch: {
    components: {
      handler(newVal) {
        this.$options.components = newVal;
      },
      immediate: true,
    },
  },

  render(...args) {
    const renderFunction = compile(this.template);
    return renderFunction.apply(this, args);
  },
};
</script>
