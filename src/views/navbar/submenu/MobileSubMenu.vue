<template>
  <transition
    enter-from-class="-translate-y-full opacity-0"
    enter-active-class="transition duration-200 ease-in-out transform sm:duration-500"
    enter-to-class="translate-y-0 opacity-100"
    leave-from-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-300 ease-in-out transform sm:duration-500"
    leave-to-class="-translate-y-full opacity-0"
  >
    <nav v-if="isOpenBinding" @click="isOpenBinding = false" class="absolute flex items-center p-4 bg-white rounded-md shadow-lg top-16 inset-x-4 md:hidden z-10" aria-label="Secondary">
      <div class="space-x-2 mr-auto">
        <!-- Notification button -->
        <!-- <v-primary-button
          v-if="connectedWallet"
          @click="
            openNotificationsPanel();
            $nextTick(() => {
              isOpenBinding = false;
            });
          "
          class="rounded-full w-11 h-11"
        >
          <span class="sr-only">Abrir notificaciones</span>
          <font-awesome-icon size="lg" icon="fa-solid fa-bell fa-lg" />
        </v-primary-button> -->
      </div>

      <wallet-multi-button />
    </nav>
  </transition>
</template>
<script>
import WalletMultiButton from "../../wallet/WalletMultiButton.vue";
import { computed } from "@vue/runtime-core";
import { useWallet } from "solana-wallets-vue";
export default {
  components: { WalletMultiButton },
  props: ["isOpen", "openNotificationsPanel"],
  setup(props, { emit }) {
    const isOpenBinding = computed({ get: () => props.isOpen, set: (value) => emit("update:isOpen", value) });
    const { wallet, connecting: connectingWallet, connected: connectedWallet } = useWallet();
    return {
      isOpenBinding,
      connectedWallet,
    };
  },
};
</script>