<template>
  <transition
    enter-from-class="opacity-0"
    enter-active-class="transition duration-300 ease-in-out"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-active-class="transition duration-300 ease-in-out"
    leave-to-class="opacity-0"
  >
    <div v-if="isOpenBinding" @click="isOpenBinding = false" class="fixed inset-0 z-10 bg-black-800 bg-opacity-25" style="opacity: 0.5" aria-hidden="true"></div>
  </transition>
  <transition
    enter-from-class="-translate-x-full"
    enter-active-class="transition duration-300 ease-in-out transform sm:duration-500"
    enter-to-class="translate-x-0"
    leave-from-class="translate-x-0"
    leave-active-class="transition duration-300 ease-in-out transform sm:duration-500"
    leave-to-class="-translate-x-full"
  >
    <section
      ref="settingsPanelRef"
      tabindex="-1"
      v-if="isOpenBinding"
      @keydown.escape="isOpenBinding = false"
      class="fixed inset-y-0 left-0 z-20 w-full max-w-xs sm:max-w-md focus:outline-none"
      aria-labelledby="settinsPanelLabel"
    >
      <!-- Panel content -->
      <div class="flex flex-col h-screen bg-primary-100 rounded-2xl shadow-md">
        <div class="absolute right-0 p-2 transform">
          <!-- Close button -->
          <button @click="isOpenBinding = false" class="p-2 text-black rounded-md focus:outline-none focus:ring">
            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <!-- Panel header -->
        <div class="flex flex-col items-center justify-center flex-shrink-0 px-4 py-6 border-b">
          <span aria-hidden="true" class="text-gray-500" />
          <h2 id="settinsPanelLabel" class="text-xl font-medium text-gray-800">Menu</h2>
        </div>
        <!-- Content -->
        <div class="flex-1 overflow-hidden hover:overflow-y-auto">
          <!-- Theme -->
          <div class="p-4 space-y-4 md:p-8">
            <slot />
          </div>
        </div>
      </div>
    </section>
  </transition>
</template>
<script>
import { computed, nextTick, onMounted, ref, watch } from "@vue/runtime-core";
export default {
  props: ["isOpen"],
  setup(props, { emit }) {
    //Refs
    const settingsPanelRef = ref(null);

    const isOpenBinding = computed({ get: () => props.isOpen, set: (value) => emit("update:isOpen", value) });

    watch(
      () => props.isOpen,
      (isOpen, prev) => {
        nextTick().then(() => {
          if (isOpen) {
            settingsPanelRef.value.focus();
          }
        });
      }
    );

    return {
      isOpenBinding,
      settingsPanelRef,
    };
  },
};
</script>