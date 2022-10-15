<template>
  <div
    class="bg-primary-50 rounded flex flex-col justify-end border-2 border-primary-200 text-left py-3 px-4 text-xs"
    :class="{
      'transition ease-in-out hover:scale-110 duration-300 cursor-pointer': hover,
    }"
  >
    <div class="text-primary-800 text-lg font-bold lex flex-col">Dispensador de '{{ candyMachine.symbol }}'</div>
    <div class="flex-col mt-2">
      <div>Total de credenciales disponibles: {{ candyMachine.itemsAvailable.toString() }}</div>
      <div>Total de credenciales cargadas: {{ candyMachine.itemsLoaded.toString() }}</div>
      <div>Total de credenciales restantes: {{ candyMachine.itemsRemaining.toString() }}</div>
      <div>Total de credenciales minteadas: {{ candyMachine.itemsMinted.toString() }}</div>
    </div>
  </div>
</template>
<script setup>
import { toRefs } from "vue-demi";

const props = defineProps({
  candyMachine: {
    type: Object,
  },
  hover: {
    type: Boolean,
    default: true,
  },
});

const { candyMachine } = toRefs(props);
</script>