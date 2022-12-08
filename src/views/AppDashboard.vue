<template>
  <div class="bg-gradient-to-bl from-red-200 via-red-300 to-yellow-200">
    <!--  -->
    <div class="flex h-screen antialiased text-gray-900">
      <div class="flex flex-col flex-1 overflow-x-hidden">
        <!-- Navbar -->
        <Popover as="header" class="relative">
          <div class="bg-primary-800/50 py-4">
            <nav class="relative mx-auto flex items-center justify-between px-4 sm:px-6" aria-label="Global">
              <div class="flex flex-1 items-center">
                <div class="flex w-full items-center justify-between md:w-auto">
                  <h1 class="text-white font-bold text-3xl mr-8">I AM GT</h1>
                  <a href="#">
                    <img class="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/mark.svg?color=white" alt="" />
                  </a>
                  <div class="-mr-2 flex items-center md:hidden">
                    <PopoverButton
                      class="focus-ring-inset inline-flex items-center justify-center rounded-md bg-primary-500 p-2 text-gray-400 hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      <span class="sr-only">Open main menu</span>
                      <Bars3Icon color="red" class="h-6 w-6 text-white" aria-hidden="true" />
                    </PopoverButton>
                  </div>
                </div>
              </div>
              <div class="hidden md:flex md:items-center md:space-x-6">
                <wallet-multi-button />
              </div>
            </nav>
          </div>

          <transition
            enter-active-class="duration-150 ease-out"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="duration-100 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <PopoverPanel focus class="absolute inset-x-0 top-0 z-10 origin-top transform p-2 transition md:hidden">
              <div class="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
                <div class="flex items-center justify-between px-5 pt-4">
                  <div>
                    <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=white" alt="" />
                  </div>
                  <div class="-mr-2">
                    <PopoverButton
                      class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-600"
                    >
                      <span class="sr-only">Close menu</span>
                      <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                    </PopoverButton>
                  </div>
                </div>
                <div class="pt-5 pb-6">
                  <div class="mt-6 px-5">
                    <wallet-multi-button class="w-full" />
                  </div>
                </div>
              </div>
            </PopoverPanel>
          </transition>
        </Popover>

        <!-- Main content -->

        <v-spinner class="self-center" v-if="connectingWallet" />

        <div v-else-if="isValidWallet" class="flex w-full grow h-full" style="overflow: auto">
          <div class="hidden sm:block sm:sticky top-0">
            <div class="overflow-y-auto flex flex-col h-full px-3 bg-primary-800/50">
              <collapsible-menu class="my-2" :routeOptions="dashboardOptionsMenu" text="Dashboard" icon="fa-solid fa-chart-line" />
              <collapsible-menu class="my-2" :routeOptions="documentsOptions" text="Documentos" icon="fa-solid fa-passport" />
              <collapsible-menu class="my-2" :routeOptions="userOptionsMenu" text="Dispensadores" icon="fa-solid fa-ticket" />
            </div>
          </div>

          <div class="conatiner mx-auto w-full h-full flex flex-col">
            <div class="text-primary-900">
              <!-- <span v-for="(matched, idx) in this.$route.matched" :key="idx">
                <a :href="matched.path">
                  {{ matched.name }}
                </a>
                <span v-if="idx != Object.keys(this.$route.matched).length - 1"> / </span>
              </span> -->
            </div>
            <div class="bg-white grow overflow-y-auto p-8">
              <router-view />
            </div>
          </div>
        </div>
        <router-view v-else />
      </div>

      <!-- Side bar menu -->
      <side-bar v-model:isOpen="isMobileMainMenuOpen">
        <collapsible-menu :routeOptions="documentsOptions" text="Documentos" icon="fa-solid fa-passport" />
        <collapsible-menu :routeOptions="userOptionsMenu" text="Dispensadores" icon="fa-solid fa-ticket" />
      </side-bar>

      <!-- Notifications -->
      <notifications-nav-bar v-model:isOpen="isNotificationsPanelOpen" />
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";
import { ChevronRightIcon } from "@heroicons/vue/20/solid";

import Login from "./auth/Login.vue";
import SideBar from "./sidebar/SideBar.vue";
import NotificationsNavBar from "./sidebar/notifications/NotificationsNavBar.vue";
import CollapsibleMenu from "./navbar/collapsible/CollapsibleMenu.vue";
import MobileSubMenu from "./navbar/submenu/MobileSubMenu.vue";
import WalletMultiButton from "./wallet/WalletMultiButton.vue";
import { ref, watch } from "vue";
import { useWallet } from "solana-wallets-vue";
import { useStore } from "vuex";
import { useWorkspace } from "@/composables";
import { useRoute, useRouter } from "vue-router";

export default {
  components: {
    Login,
    WalletMultiButton,
    SideBar,
    CollapsibleMenu,
    NotificationsNavBar,
    MobileSubMenu,
    ChevronRightIcon,
    Bars3Icon,
    XMarkIcon,
    Popover,
    PopoverButton,
    PopoverPanel,
  },
  name: "AppDashboard",
  setup() {
    const store = useStore();
    const router = useRouter();

    const dashboardOptionsMenu = [{ id: 1, path: { name: "Dashboard" }, name: "Dashboard" }];

    // Constants
    const userOptionsMenu = [
      { id: 1, path: { name: "Dispensadores" }, name: "Dispensadores" },
      { id: 2, path: { name: "Crear dispensadores" }, name: "Crear dispensador" },
    ];

    const documentsOptions = [
      // { id: 1, path: { name: "Dashboard" }, name: "Dashboard" },
      // { id: 2, path: { name: "Login" }, name: "Requisitos" },
      { id: 3, path: { name: "Credenciales" }, name: "Credenciales" },
    ];

    // Reactive properties
    const isNotificationsPanelOpen = ref(false);
    const isMobileSubMenuOpen = ref(false);
    const isMobileMainMenuOpen = ref(false);
    const { isValidWallet } = useWorkspace();
    const { wallet, connecting: connectingWallet, connected: connectedWallet } = useWallet();
    watch(connectedWallet, (val) => {
      if (val) {
        //If conected go somewhere
        const redirect = sessionStorage.getItem("redirectTo") ?? "/";
        sessionStorage.removeItem("redirectTo");
        router.push(redirect);
      } else {
        router.push("/login");
      }
    });
    //Functions
    function openNotificationsPanel() {
      this.isNotificationsPanelOpen = true;
    }

    return {
      userOptionsMenu,
      documentsOptions,
      isNotificationsPanelOpen,
      isMobileSubMenuOpen,
      isMobileMainMenuOpen,
      openNotificationsPanel,
      connectingWallet,
      connectedWallet,
      isValidWallet,
      dashboardOptionsMenu,
    };
  },
};
</script>
<style>
/* This example part of kwd-dashboard see https://kamona-wd.github.io/kwd-dashboard/ */
/* So here we will write some classes to simulate dark mode and some of tailwind css config in our project */
:root {
  --light: #edf2f9;
  --dark: #152e4d;
  --darker: #12263f;

  --color-red: #dc2626;
  --color-green: #16a34a;
  --color-primary: #2563eb;
  --color-cyan: #0891b2;
  --color-teal: #0d9488;
  --color-fuchsia: #c026d3;
  --color-orange: #ea580c;
  --color-yellow: #ca8a04;
  --color-violet: #7c3aed;
}

.dark .dark\:text-light {
  color: var(--light);
}

.dark .dark\:bg-dark {
  background-color: var(--dark);
}

.dark .dark\:bg-darker {
  background-color: var(--darker);
}

.dark .dark\:text-gray-300 {
  color: #d1d5db;
}

.dark .dark\:text-primary-500 {
  color: #3b82f6;
}

.dark .dark\:text-primary-100 {
  color: #dbeafe;
}

.dark .dark\:hover\:text-light:hover {
  color: var(--light);
}

.dark .dark\:border-primary-800 {
  border-color: #1e40af;
}

.dark .dark\:border-primary-700 {
  border-color: #1d4ed8;
}

.dark .dark\:bg-primary-600 {
  background-color: #2563eb;
}

.dark .dark\:hover\:bg-primary-600:hover {
  background-color: #2563eb;
}

.hover\:overflow-y-auto:hover {
  overflow-y: auto;
}

.primary-gradient {
  background: #834d9b; /* fallback for old browsers */
  background: -webkit-linear-gradient(to left, #d04ed6, #834d9b); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to left, #d04ed6, #834d9b); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>