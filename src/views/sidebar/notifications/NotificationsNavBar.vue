<template>
  <!-- Backdrop -->
  <transition
    enter-from-class="opacity-0"
    enter-active-class="transition duration-300 ease-in-out"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-active-class="transition duration-300 ease-in-out"
    leave-to-class="opacity-0"
  >
    <div v-if="isOpenBinding" @click="isOpenBinding = false" class="fixed inset-0 z-10 bg-primary-800 bg-opacity-25" style="opacity: 0.5" aria-hidden="true"></div>
  </transition>
  <transition
    enter-active-class="transition duration-300 ease-in-out transform sm:duration-500"
    enter-from-class="-translate-x-full"
    enter-to-class="translate-x-0"
    leave-active-class="transition duration-300 ease-in-out transform sm:duration-500"
    leave-from-class="translate-x-0"
    leave-to-class="-translate-x-full"
  >
    <section
      ref="notificationsPanel"
      v-if="isOpenBinding"
      @keydown.escape="isOpenBinding = false"
      tabindex="-1"
      aria-labelledby="notificationPanelLabel"
      class="fixed inset-y-0 z-20 w-full max-w-xs bg-white sm:max-w-md focus:outline-none"
    >
      <div class="flex flex-col h-screen">
        <!-- Panel header -->
        <div class="flex-shrink-0">
          <div class="flex items-center justify-between px-4 pt-4 border-b">
            <h2 id="notificationPanelLabel" class="pb-4 font-semibold">Notificaciones</h2>
          </div>
        </div>
        <div class="absolute right-0 p-2">
          <!-- Close button -->
          <button @click="isOpenBinding = false" class="p-2 text-black rounded-md focus:outline-none focus:ring">
            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <!-- Panel content (tabs) -->
        <div class="flex-1 pt-4 overflow-y-hidden hover:overflow-y-auto">
          <!-- User tab -->
          <div class="space-y-4">
            <a href="#" class="block">
              <div class="flex px-4 space-x-4">
                <div class="relative flex-shrink-0">
                  <span class="relative z-10 inline-block overflow-visible rounded-ful">
                    <img class="object-cover rounded-full w-9 h-9" src="https://avatars.githubusercontent.com/u/57622665?s=460&u=8f581f4c4acd4c18c33a87b3e6476112325e8b38&v=4" alt="Ahmed kamel" />
                  </span>
                  <div class="absolute h-24 p-px -mt-3 -ml-px bg-primary-50 left-1/2"></div>
                </div>
                <div class="flex-1 overflow-hidden">
                  <h5 class="text-sm font-semibold text-gray-600">Ahmed Kamel</h5>
                  <p class="text-sm font-normal text-gray-400 truncate">Shared new project "K-WD Dashboard"</p>
                  <span class="text-sm font-normal text-gray-400"> 1d ago </span>
                </div>
              </div>
            </a>
            <a href="#" class="block">
              <div class="flex px-4 space-x-4">
                <div class="relative flex-shrink-0">
                  <span class="relative z-10 inline-block overflow-visible rounded-ful">
                    <img class="object-cover rounded-full w-9 h-9" src="https://avatars.githubusercontent.com/u/57622665?s=460&u=8f581f4c4acd4c18c33a87b3e6476112325e8b38&v=4" alt="Ahmed kamel" />
                  </span>
                  <div class="absolute h-24 p-px -mt-3 -ml-px bg-primary-50 left-1/2"></div>
                </div>
                <div class="flex-1 overflow-hidden">
                  <h5 class="text-sm font-semibold text-gray-600">Ahmed Kamel</h5>
                  <p class="text-sm font-normal text-gray-400 truncate">Commit new changes to K-WD Dashboard project.</p>
                  <span class="text-sm font-normal text-gray-400"> 10h ago </span>
                </div>
              </div>
            </a>
            <a href="#" class="block">
              <div class="flex px-4 space-x-4">
                <div class="relative flex-shrink-0">
                  <span class="relative z-10 inline-block overflow-visible rounded-ful">
                    <img class="object-cover rounded-full w-9 h-9" src="https://avatars.githubusercontent.com/u/57622665?s=460&u=8f581f4c4acd4c18c33a87b3e6476112325e8b38&v=4" alt="Ahmed kamel" />
                  </span>
                  <div class="absolute h-24 p-px -mt-3 -ml-px bg-primary-50 left-1/2"></div>
                </div>
                <div class="flex-1 overflow-hidden">
                  <h5 class="text-sm font-semibold text-gray-600">Ahmed Kamel</h5>
                  <p class="text-sm font-normal text-gray-400 truncate">Release new version "K-WD Dashboard"</p>
                  <span class="text-sm font-normal text-gray-400"> 20d ago </span>
                </div>
              </div>
            </a>
            <template v-for="i in 10" :key="i">
              <a href="#" class="block">
                <div class="flex px-4 space-x-4">
                  <div class="relative flex-shrink-0">
                    <span class="relative z-10 inline-block overflow-visible rounded-ful">
                      <img class="object-cover rounded-full w-9 h-9" src="https://avatars.githubusercontent.com/u/57622665?s=460&u=8f581f4c4acd4c18c33a87b3e6476112325e8b38&v=4" alt="Ahmed kamel" />
                    </span>
                    <div class="absolute h-24 p-px -mt-3 -ml-px bg-primary-50 left-1/2"></div>
                  </div>
                  <div class="flex-1 overflow-hidden">
                    <h5 class="text-sm font-semibold text-gray-600">Ahmed Kamel</h5>
                    <p class="text-sm font-normal text-gray-400 truncate">Release new version "K-WD Dashboard"</p>
                    <span class="text-sm font-normal text-gray-400"> 20d ago </span>
                  </div>
                </div>
              </a>
            </template>
          </div>
        </div>
      </div>
    </section>
  </transition>
</template>
<script>
import { ref, computed } from "@vue/reactivity";
export default {
  props: ["isOpen"],
  setup(props, { emit }) {
    //Ref
    const notificationsPanel = ref(null);

    // Computed
    const isOpenBinding = computed({ get: () => props.isOpen, set: (value) => emit("update:isOpen", value) });

    return {
      isOpenBinding,
      notificationsPanel,
    };
  },
};
</script>