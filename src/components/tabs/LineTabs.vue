<template>
  <div class="border-b" :class="[borderColor]">
    <ul class="flex flex-row -mb-px text-sm font-medium text-center">
      <li
        v-for="(tab, index) in tabs"
        :key="`${index}-tab`"
        :disabled="disabled(tab, index)"
        @click="selectTab(tab, index)"
        class="p-4 rounded-t-lg tab-item cursor-pointer transition duration-500"
        :class="[{ 'mr-2': shouldHaveMarginRight(index), 'cursor-not-allowed': disabled(tab, index) }, ...listClasses(index)]"
      >
        <slot :item="tab" :selected="isSelected(index)" :disabled="disabled(tab, index)"></slot>
      </li>
    </ul>
  </div>
</template>
<script>
import { computed, ref, toRefs } from "@vue/reactivity";
export default {
  props: {
    tabs: {
      type: Array,
      default: [],
    },
    borderColor: {
      type: String,
      default: "border-gray-200 dark:border-gray-700",
    },
    unselectedColor: {
      type: String,
      default: "text-gray-500 dark:text-gray-400 hover:text-gray-600",
    },
    selectedColor: {
      type: String,
      default: "text-primary-600 dark:text-primary-500",
    },
    selectedColorBorder: {
      type: String,
      default: "dark:border-primary-500 border-primary-600",
    },
    tabItemClass: {
      type: String,
      default: null,
    },
    modelValue: {
      type: Number,
      default: 0,
    },
    disabled: {
      type: Function,
      default: (tab, index) => false,
    },
  },
  setup(props, { emit }) {
    const { tabs, borderColor, unselectedColor, selectedColor, selectedColorBorder, tabItemClass, modelValue, disabled } = toRefs(props);
    function shouldHaveMarginRight(index) {
      return index != tabs.value.length - 1;
    }
    function isSelected(index) {
      return modelValue.value == index;
    }

    function listClasses(index) {
      let classes = [];
      if (isSelected(index)) {
        classes.push(selectedColorBorder.value);
        classes.push(selectedColor.value);
        classes.push("border-b-2");
      } else {
        classes.push(unselectedColor.value);
      }
      if (tabItemClass.value) {
        classes.push(tabItemClass.value);
      }
      return classes;
    }

    function selectTab(tab, index) {
      if (!disabled.value(tab, index)) {
        emit("update:modelValue", index);
      }
    }

    return { shouldHaveMarginRight, tabs, borderColor, unselectedColor, selectedColor, selectedColorBorder, isSelected, listClasses, modelValue, disabled, selectTab };
  },
};
</script>