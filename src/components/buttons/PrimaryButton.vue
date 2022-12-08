<template>
  <button :disabled="disabled" @click="(e) => $emit('onClick', e)" class="text-white transition-colors duration-200 focus:outline-none focus:ring hover:text-white" :class="[classMap, padding]">
    <slot />
  </button>
</template>
<script>
import { computed, toRef, toRefs } from "vue";
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
    color: {
      type: String,
      default: "bg-primary-400 hover:bg-primary-500 focus:ring-primary-800 active:bg-primary-700",
    },
  },
  setup(props) {
    const reactiveDisabled = toRef(props.disabled);
    const { color, disabled } = toRefs(props);
    const classMap = computed(() => {
      const m = {
        // 'bg-primary-400 hover:bg-primary-500 focus:ring-primary-800 active:bg-primary-700': !disabled,
        "bg-gray-400": disabled.value,
      };
      m[color.value] = !disabled.value;
      return m;
    });
    //Computed
    return {
      classMap,
    };
  },
};
</script>