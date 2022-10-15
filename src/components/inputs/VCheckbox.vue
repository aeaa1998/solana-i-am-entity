<template>
  <div class="flex items-center rounded w-fit cursor-pointer" @click="value = !value">
    <input-label class="mr-3 cursor-pointer" v-if="label" :text="label" />
    <input :name="name" type="checkbox" v-model="value" class="h-4 w-4 rounded checked:bg-primary-300/70 focus:ring-primary-300/60 my-2 cursor-pointer" />
  </div>
</template>
<script setup>
import InputLabel from "./InputLabel.vue";
import { computed, toRefs } from "vue";
import { veeValidatableProps, veeValidateState } from "@/composables/useInputComposition";

const props = defineProps(veeValidatableProps({}, false));

const emit = defineEmits(["update:modelValue"]);

const { name, value } = veeValidateState(props);
</script>