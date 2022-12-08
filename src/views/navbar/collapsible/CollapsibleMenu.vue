<template>
  <!-- links -->
  <div>
    <!-- active & hover classes 'bg-primary-100 ' -->
    <a
      href="#"
      @click="
        $event.preventDefault();
        isOpen = !isOpen;
        isActive = !isActive;
      "
      class="flex items-center py-2 px-3 transition-colors rounded-md hover:bg-primary-300 hover:text-white font-semibold"
      :class="{ 'bg-primary-300 text-white': isActive || isOpen, 'text-white': !isActive && !isOpen }"
      role="button"
      aria-haspopup="true"
      :aria-expanded="isOpen || isActive ? 'true' : 'false'"
    >
      <font-awesome-icon size="lg" :icon="icon" class="mr-4" />
      <span class="ml-2 text-md"> {{ text }} </span>

      <!-- active class 'rotate-180' -->
    </a>
    <div v-if="isOpen" class="mt-2 space-y-2 flex flex-col" role="menu" :aria-label="text">
      <collapsible-menu-row v-for="route in routeOptions" :key="route.id" :routeOption="route" />
    </div>
  </div>
</template>
<script>
import CollapsibleMenuRow from "./CollapsibleMenuRow.vue";
import { ref, toRefs } from "@vue/reactivity";
export default {
  components: {
    CollapsibleMenuRow,
  },
  props: {
    icon: {
      type: String,
      default: "fa-solid fa-bars",
    },
    text: {
      type: String,
    },
    routeOptions: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    //Props destruct
    const { text, routeOptions } = toRefs(props);

    //Refs
    const isOpen = ref(false);
    const isActive = ref(false);

    //Methods declaration

    return {
      isOpen,
      isActive,
    };
  },
};
</script>