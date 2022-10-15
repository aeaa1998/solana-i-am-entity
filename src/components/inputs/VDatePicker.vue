<template>
  <input-scaffold>
    <input-label v-if="label" :text="label" />
    <date-picker
      @open="opened = true"
      @closed="opened = false"
      ref="datepicker"
      :name="name"
      :inputClassName="'date_q_input ' + vClass + ' ' + focusStyle"
      v-model="value"
      autoApply
      :enableTimePicker="enableTimePicker"
      :placeholder="placeholder"
    >
      <template v-for="(_, name) in $slots" :name="name" v-slot:[name]="slotData">
        <slot :name="name" v-bind="slotData" />
      </template>
    </date-picker>
    <span v-if="errors.length">{{ errors[0] }}</span>
  </input-scaffold>
</template>
<script setup>
import DatePicker from "@vuepic/vue-datepicker";
import InputLabel from "./InputLabel.vue";
import { InputScaffold } from "./";
import { veeValidatableProps, veeValidateState } from "@/composables/useInputComposition";
import { computed, ref, toRef, toRefs, watch } from "vue";

const props = defineProps({
  ...veeValidatableProps({
    vClass: {
      type: String,
      default: "",
    },
    enableTimePicker: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: () => "Selecciona la fecha",
    },
  }),
});

let options = {};

//Todo check if is working
if (props.initialValue) {
  if (!props.enableTimePicker) {
    const temporal = new Date(`${props.initialValue}`);
    var userTimezoneOffset = temporal.getTimezoneOffset() * 60000;
    options.initialValue = new Date(temporal.getTime() + userTimezoneOffset);
  }
}
const { name, value, errors, isInvalid, handleChange, handleBlur, validate } = veeValidateState(props, options);
const { enableTimePicker } = toRefs(props);
const opened = ref(false);

//Handle focus with the events
const focusStyle = computed(() => {
  let className = "";
  //   if (isInvalid.value) {
  //     className += "!border-red-500/40 ring ring-red-500/40 ";
  //   }
  if (opened.value) {
    className += "!bg-primary-100 !ring-0";
    // className += " !bg-white ring ring-offset-1 ";
    // if (isInvalid.value) {
    //   className += " ring-red-500 ring-opacity-70 !border-red-500/70 ";
    // } else {
    //   className += " ring-opacity-60 !border-green-300/60 ring-green-300 ";
    // }
  }

  return className;
});
</script>
<style scoped lang="postcss">
</style>
<style lang="postcss" scoped>
.input-class {
  @apply w-full border-2 border-transparent bg-gray-100 h-11 rounded-lg shadow-md hover:bg-primary-50 focus:bg-primary-100 focus:ring-0 p-1 text-sm text-gray-900 hover:border-primary-200;
}
:deep(.date_q_input) {
  @apply input-class !px-9;
}
</style>