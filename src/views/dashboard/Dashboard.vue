<template>
  <div class="flex flex-col">
    <div class="text-3xl font-bold text-gray-900 tracking-wide">Dashboard</div>
    <hr class="mt-3 dark:border-primary-400 border-t-2 rounded mb-8" />
    <div class="flex flex-wrap w-full gap-4">
      <!-- Card for best candy machines -->
      <div class="cursor-pointer rounded bg-secondary-500/75 px-8 py-3 relative shadow-lg flex flex-row flex-wrap justify-center">
        <h1 class="text-2xl font-bold w-full text-center text-white">Credenciales</h1>
        <lottie-player
          class="self-center mt-4"
          src="https://assets9.lottiefiles.com/packages/lf20_6gadk1by.json"
          background="transparent"
          speed="1"
          style="width: 200px; height: 200px"
          loop
          autoplay
        ></lottie-player>
      </div>
      <div class="cursor-pointer rounded bg-secondary-500/75 px-8 py-3 relative shadow-lg flex flex-row flex-wrap justify-center">
        <h1 class="text-2xl font-bold w-full text-center text-white">Dispensadores</h1>
        <lottie-player
          class="self-center mt-4"
          src="https://assets2.lottiefiles.com/packages/lf20_dmlujpzk.json"
          background="transparent"
          speed="1"
          style="width: 200px; height: 200px"
          loop
          autoplay
        ></lottie-player>
      </div>
    </div>
  </div>
</template>
<script>
import * as LottiePlayer from "@lottiefiles/lottie-player";
export default {
  name: "Dashboard",
};
</script>