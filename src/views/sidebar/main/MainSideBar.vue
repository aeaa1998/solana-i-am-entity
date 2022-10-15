<template>
  <div class="h-screen flex grow bg-primary-50">
    <collapsible-menu v-for="(index, routeOption) in options" :key="index" :routeOptions="routeOption.items" :text="routeOption.text" />
  </div>
</template>
<script>
export default {
  props: ["options"],
  setup() {},
};
</script>