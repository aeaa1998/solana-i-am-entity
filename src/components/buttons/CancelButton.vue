<template>
  <button
    @click="(e) => $emit('onClick', e)"
    class="p-2 text-white transition-colors duration-200 bg-red-400 hover:text-white hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-800 active:bg-red-700"
  >
    <slot />
  </button>
</template>