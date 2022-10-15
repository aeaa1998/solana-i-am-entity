<template>
  <div class="h-full relative flex flex-col items-center pt-20">
    <div class="relative sm:max-w-sm w-full">
      <div class="card bg-primary-400 shadow-lg w-full h-full rounded-3xl absolute transform -rotate-6"></div>
      <div class="card bg-red-400 shadow-lg w-full h-full rounded-3xl absolute transform rotate-6"></div>
      <div class="relative w-full rounded-3xl px-6 py-4 bg-gray-100 shadow-md">
        <label for="" class="mb-4 block mt-3 text-2xl text-gray-700 text-center font-semibold"> RENAP - Dashboard </label>
        <div class="text-center py-4 text-base text-slate-400">Conecta tu e-wallet para poder acceder al portal de RENAP</div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, watch } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
  name: "Login",
  components: {},
  setup() {
    //state
    // const { publicKey, wallet, disconnect } = useWallet();
    const store = useStore();

    // initWallet({ phantomWallet, autoConnect: true });

    return {
      // wallet,
      // disconnect,
      // publicKey,
    };
  },
};
</script>