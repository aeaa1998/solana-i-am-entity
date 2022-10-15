<template>
  <button class="border-none px-4 py-2 rounded cursor-pointer shadow-xl hover:shadow-inner transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105">
    <slot></slot>
  </button>
</template>
<script>
export default {
  name: "RoundedButton",
};
</script>