<template>
  <div class="bg-primary-50">
    <!--  -->
    <div class="flex h-screen antialiased text-gray-900">
      <div class="flex flex-col flex-1 overflow-x-hidden">
        <!-- Navbar -->
        <header class="py-2 relative z-10">
          <div class="flex items-center justify-between p-2">
            <!-- Mobile menu button -->
            <div>
              <v-primary-button v-if="connectedWallet" @click="isMobileMainMenuOpen = !isMobileMainMenuOpen" class="sm:hidden h-10 w-10 rounded-md">
                <span class="sr-only">Open main manu</span>
                <span aria-hidden="true">
                  <font-awesome-icon size="xl" icon="fa-solid fa-bars" />
                </span>
              </v-primary-button>

              <!-- Brand -->
              <a href="#" class="ml-4 inline-block text-2xl font-bold tracking-wider text-black uppercase"> IAM - GT </a>
            </div>
            <!-- Mobile sub menu button -->

            <div>
              <v-primary-button @click="isMobileSubMenuOpen = !isMobileSubMenuOpen" class="rounded-md md:hidden h-10 w-10">
                <span class="sr-only">Open sub menu</span>
                <span aria-hidden="true">
                  <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </span>
              </v-primary-button>
              <!-- Desktop Right buttons -->
              <nav aria-label="Secondary" class="hidden space-x-2 md:flex md:items-center">
                <!-- Notification button -->
                <!-- <v-primary-button v-if="connectedWallet" @click="isNotificationsPanelOpen = !isNotificationsPanelOpen" class="w-11 h-11 rounded-full">
                  <span class="sr-only">Open Notification panel</span>
                  <font-awesome-icon size="lg" icon="fa-solid fa-bell fa-lg" />
                </v-primary-button> -->

                <!-- User avatar button -->

                <wallet-multi-button />
              </nav>

              <!-- Mobile sub menu -->
              <mobile-sub-menu v-model:isOpen="isMobileSubMenuOpen" :openNotificationsPanel="openNotificationsPanel" />
            </div>
          </div>
        </header>

        <!-- Main content -->

        <v-spinner class="self-center" v-if="connectingWallet" />

        <div v-else-if="isValidWallet" class="flex w-full grow h-full" style="overflow: auto">
          <div class="px-4 xl:w-1/5 lg:w-1/4 md:-2/5 sm:w-1/3 hidden sm:block py-3 sm:sticky top-0">
            <div class="overflow-y-auto flex flex-col h-full">
              <collapsible-menu class="my-2" :routeOptions="documentsOptions" text="Documentos" icon="fa-solid fa-passport" />
              <collapsible-menu class="my-2" :routeOptions="userOptionsMenu" text="Dispensadores" icon="fa-solid fa-ticket" />
            </div>
          </div>

          <div class="conatiner mx-auto py-3 px-2 w-full h-full flex flex-col">
            <div class="py-2 text-primary-900">
              <span v-for="(matched, idx) in this.$route.matched" :key="idx">
                <a :href="matched.path">
                  {{ matched.name }}
                </a>
                <span v-if="idx != Object.keys(this.$route.matched).length - 1"> / </span>
              </span>
            </div>
            <div class="bg-white rounded-lg grow overflow-y-auto p-8">
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
  },
  name: "AppDashboard",
  setup() {
    const store = useStore();
    const router = useRouter();
    // Constants
    const userOptionsMenu = [
      { id: 1, path: { name: "Dispensadores" }, name: "Dispensadores" },
      { id: 2, path: { name: "Crear dispensadores" }, name: "Crear dispensador" },
    ];

    const documentsOptions = [
      { id: 1, path: { name: "Dashboard" }, name: "Dashboard" },
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
</style>