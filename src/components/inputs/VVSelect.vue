<template>
  <input-scaffold :class="wrapperClass">
    <input-label v-if="label" class="mb-2" :text="label" />
    <v-select
      v-if="hasLoaded"
      :options="options"
      :close-on-select="!multiple"
      :push-tags="taggable"
      :multiple="multiple"
      :taggable="taggable"
      :class="[vClass, `state-${stateClass}`]"
      :name="name"
      v-bind="$attrs"
      v-model="value"
      :reduce="reduce"
      :labelOption="labelOption"
      :placeholder="placeholder"
      :createOption="createOption"
      :getOptionLabel="getOptionLabel"
      @option:created="(n) => $emit('option:created', n)"
      class="
        w-full
        border-2 border-transparent
        bg-gray-100
        min-h-[2.75rem]
        rounded-lg
        shadow-md
        hover:bg-primary-50
        focus:bg-primary-100 focus:ring-0
        p-1
        text-sm text-gray-900
        hover:border-primary-200
      "
    />
    <span v-if="errors.length">{{ errors[0] }}</span>
  </input-scaffold>
</template>
<script setup>
import vSelect from "vue-select";
import InputLabel from "./InputLabel.vue";
import { InputScaffold } from "./";
import { veeValidatableProps, veeValidateState } from "@/composables/useInputComposition";
import { isEqual } from "lodash";
import { onBeforeMount, ref, toRefs } from "vue-demi";

const props = defineProps({
  ...veeValidatableProps(
    {
      options: {
        type: Array,
        default: [],
      },
      wrapperClass: {
        type: String,
        default: "",
      },
      vClass: {
        type: String,
        default: "",
      },
      placeholder: {
        type: String,
        default: "inputs.placeholders.generic-select",
      },
      multiple: {
        type: Boolean,
        default: false,
      },
      taggable: {
        type: Boolean,
        default: false,
      },
      reduce: {
        type: [Function, String],
        default: () => (item) => item,
      },
      labelOption: {
        type: [Function, String],
        default: () => (item) => item.label,
      },
      getOptionLabel: {
        type: [Function, String],
        default: () => (item) => item.label,
      },
      isSelected: {
        type: Function,
        default: (option) => false,
      },
      createOption: {
        type: Function,
        default(newOption) {
          if (typeof this.optionList[0] === "object") {
            newOption = { [this.label]: newOption };
          }

          this.$emit("option:created", newOption);
          return newOption;
        },
      },
      filter: {
        type: Function,
        default(options, search) {
          return options.filter((option) => {
            let label = this.getOptionLabel(option);
            if (typeof label === "number") {
              label = label.toString();
            }
            return this.filterBy(option, label, search);
          });
        },
      },
    },
    null
  ),
});

const hasLoaded = ref(false);
const emit = defineEmits(["update:modelValue"]);
const { options } = toRefs(props);
onBeforeMount(() => {
  //We have to check if the value is there
  if (props.taggable && props.initialValue != "" && props.initialValue) {
    if (props.multiple) {
      const optionsNormalized = props.options.map(props.reduce);
      props.initialValue
        .filter((value) => {
          return !optionsNormalized.includes(value);
        })
        .forEach((value) => {
          options.value.push(props.createOption(value));
        });
    } else {
      if (
        // The options does not have the initial value
        !props.options.some((option) => {
          const optionValue = props.reduce(option);
          if (typeof optionValue == "object") {
            return isEqual(option, props.initialValue);
          } else {
            return optionValue == props.initialValue;
          }
        })
      ) {
        options.value.push(props.createOption(props.initialValue));
      }
    }
  }
  hasLoaded.value = true;
});

const { name, value, errors, stateClass } = veeValidateState(props);
</script>
