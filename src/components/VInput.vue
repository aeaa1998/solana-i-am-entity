<template>
  <input-scaffold>
    <input-label v-if="label" class="mb-2" :text="label" />
    <input v-bind="$attrs" :type="inputType" v-model="value" :name="name" :placeholder="placeholder" class="input-class" />
    <div v-if="password" class="trailing-icon-wrapper flex items-center">
      <font-awesome-icon @click="togglePassword" :icon="passwordIcon" class="trailing-icon" />
    </div>
    <!-- <error-message  :name="nameRef" /> -->
    <span v-if="errors.length">{{ errors[0] }}</span>
  </input-scaffold>
</template>
<script setup>
import InputLabel from "./inputs/InputLabel.vue";
import { InputScaffold } from "./inputs";
import { veeValidatableProps, veeValidateState } from "@/composables/useInputComposition";
import { computed, ref } from "vue-demi";

const props = defineProps({
  ...veeValidatableProps({
    vClass: {
      type: String,
      default: "",
    },
    password: {
      type: Boolean,
      default: false,
    },
    class: {
      type: [String, Array, Object],
    },
  }),
});

const emit = defineEmits(["update:modelValue"]);
const showsPassword = ref(false);

const inputType = computed(() => (props.password && !showsPassword.value ? "password" : "text"));
const passwordIcon = computed(() => (showsPassword.value ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"));
const togglePassword = () => {
  showsPassword.value = !showsPassword.value;
};
const { name, value, errors, stateClass, isInvalid, meta } = veeValidateState(props);
</script>

<style scoped lang="postcss">
.input-class {
  @apply w-full border-2 border-transparent bg-gray-100 h-11 rounded-lg shadow-md hover:bg-primary-50 focus:bg-primary-100 focus:ring-0 p-1 text-sm text-gray-900 hover:border-primary-200;
}

.trailing-icon-wrapper {
  @apply right-2 h-full absolute top-0 z-10;
}
.trailing-icon {
  @apply h-4 cursor-pointer;
}
</style>