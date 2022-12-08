<template>
  <notifications />

  <router-view v-if="!logged" />
  <template v-else>
    <AppDashboard />
  </template>
</template>
<script>
import { reactive, ref } from "@vue/reactivity";
import AppDashboard from "./views/AppDashboard.vue";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { initWallet } from "solana-wallets-vue";
import { useRoute } from "vue-router";
import { computed, provide } from "@vue/runtime-core";
import { initWorkspace } from "@/composables";
import { useWorkspace } from "@/composables";

const walletOptions = {
  wallets: [new PhantomWalletAdapter()],
  autoConnect: true,
};
export default {
  name: "App",
  components: {
    AppDashboard,
  },
  setup() {
    const route = useRoute();

    //Computed property
    const currentRouteName = computed(() => route.name);

    initWallet(walletOptions);
    initWorkspace();

    //Provide
    provide("currentRouteName", currentRouteName);
    const { wallet } = useWorkspace();
    // const logged = computed(() => !!wallet.value);
    const logged = computed(() => true);

    return {
      logged,
    };
  },
};
</script>
<style lang="scss">
</style>
