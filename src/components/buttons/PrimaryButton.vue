<template>
  <button
    :disabled="disabled"
    @click="(e) => $emit('onClick', e)"
    class="text-white transition-colors duration-200 focus:outline-none focus:ring hover:text-white"
    :class="[
      {
        'bg-primary-400 hover:bg-primary-500 focus:ring-primary-800 active:bg-primary-700': !disabled,
        'bg-gray-400': disabled,
      },
      padding,
    ]"
  >
    <slot />
  </button>
</template>
<script>
import { toRef } from "vue";
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    padding: {
      type: String,
      default: "p-2 ",
    },
  },
  setup(props) {
    const reactiveDisabled = toRef(props.disabled);

    //Computed
  },
};
</script>