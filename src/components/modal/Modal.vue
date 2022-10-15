<template>
  <teleport to="body">
    <transition
      enter-active-class="duration-300 ease-out"
      enter-from-class="transform opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="transform opacity-0"
    >
      <div v-if="modelValue" class="i-am-mask">
        <div class="i-am-wrapper" :class="classWrapper">
          <div class="i-am-container rounded bg-white" v-bind="$attrs" ref="modal">
            <slot />
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>
<script>
import { ref, toRefs } from "vue";
import { onClickOutside, onKeyStroke } from "@vueuse/core";

export default {
  props: {
    modelValue: { type: Boolean },
    close: {
      type: Function,
      default: null,
    },
    closeOnClickOutside: {
      type: Boolean,
      default: false,
    },
    classWrapper: {
      type: String,
      default: "",
    },
  },
  inheritAttrs: false,
  setup(props, { emit }) {
    const { close } = toRefs(props);
    const modal = ref(null);
    onClickOutside(modal, (event) => (close.value ? close.value() : emit("update:modelValue", false)));
    onKeyStroke("Escape", () => emit("update:modelValue", false));
    return { modal };
  },
};
</script>
<style scoped>
.i-am-mask {
  /* padding-top: 40px;
  padding-bottom: 40px; */
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: opacity 0.3s ease;
}

.i-am-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.i-am-container {
  margin: 0px auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.5s ease;
}
</style>