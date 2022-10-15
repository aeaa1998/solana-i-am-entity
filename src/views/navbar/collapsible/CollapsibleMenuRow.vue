<template>
  <!-- active & hover classes 'text-gray-700 ' -->
  <!-- inActive classes 'text-gray-400 ' -->
  <router-link
    :to="routeOption.path"
    role="menuitem"
    class="p-2 text-sm transition-colors duration-200 rounded-md hover:text-gray-700 hover:bg-primary-100"
    :class="{
      'text-gray-700 bg-primary-100 font-semibold	': isActive,
      'text-gray-600': !isActive,
    }"
    v-slot="{ href, navigate }"
  >
    <a :href="href" @click="navigate">{{ routeOption.name }}</a>
  </router-link>
</template>
<script>
import { toRefs } from "@vue/reactivity";
import { computed, inject, watch } from "@vue/runtime-core";
export default {
  props: ["routeOption"],
  setup(props) {
    //Props destruct
    const { routeOption } = toRefs(props);

    //Inyection
    const currentRouteName = inject("currentRouteName");

    //Computed properties

    const isActive = computed(() => props.routeOption.path.name == currentRouteName.value);

    return {
      currentRouteName,
      isActive,
    };
  },
};
</script>