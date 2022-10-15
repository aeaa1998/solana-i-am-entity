<template>
  <input-scaffold>
    <input-label v-if="label" class="mb-2" :text="label" />
    <textarea
      :name="name"
      v-model="value"
      :placeholder="placeholder"
      class="w-full border-2 border-transparent bg-gray-100 rounded-lg shadow-md hover:bg-primary-50 focus:bg-primary-100 focus:ring-0 p-1 text-sm text-gray-900 hover:border-primary-200"
      :rows="rows"
      :style="{
        resize: resize,
      }"
    />
    <span v-if="errors.length">{{ errors[0] }}</span>
  </input-scaffold>
</template>
<script setup>
import InputLabel from "./InputLabel.vue";
import { InputScaffold } from "./";
import { veeValidatableProps, veeValidateState } from "@/composables/useInputComposition";
const props = defineProps(
  veeValidatableProps({
    vClass: {
      type: String,
      default: "",
    },
    rows: {
      type: Number,
      default: 8,
    },
    // Only allow resize valid values
    resize: {
      type: String,
      default: "none",
      validator(value) {
        return ["none", "both", "horizontal", "vertical", "inherit"].includes(value);
      },
    },
  })
);

const emit = defineEmits(["update:modelValue"]);

const { name, value, errors, stateClass, isInvalid } = veeValidateState(props);
</script>
