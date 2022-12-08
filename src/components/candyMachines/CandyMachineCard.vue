<template>
  <li class="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow-lg">
    <div class="flex w-full items-center justify-between space-x-6 p-6">
      <div class="flex-1 truncate">
        <div class="flex items-center space-x-3">
          <h3 class="truncate text-sm font-medium text-gray-900">{{ candyMachine.symbol }} #{{ number }}</h3>
          <span v-if="alive" class="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">En vivo</span>
        </div>
        <p class="mt-1 truncate text-sm text-gray-500">{{ candyMachine.itemsRemaining.toString() }} credenciales restantes</p>
        <p class="mt-1 truncate text-sm text-gray-500">{{ candyMachine.itemsMinted.toString() }} minteadas del dispensador</p>
      </div>
    </div>
  </li>
</template>
<script setup>
import { ref, toRefs } from "vue-demi";

const props = defineProps({
  candyMachine: {
    type: Object,
  },
  hover: {
    type: Boolean,
    default: true,
  },
  number: {
    type: Number,
    default: 0,
  },
});

const { candyMachine } = toRefs(props);
const alive = ref(false);
</script>