<template>
  <div class="relative overflow-hidden">
    <div class="pt-10 sm:pt-16 lg:overflow-hidden lg:pt-8 lg:pb-14">
      <div class="mx-auto max-w-7xl lg:px-8">
        <div class="lg:grid lg:grid-cols-2 lg:gap-8">
          <div class="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:flex lg:items-center lg:px-0 lg:text-left">
            <div class="lg:py-24">
              <h1 class="mt-4 text-4xl font-bold tracking-tight text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                <span class="block">Dashboard</span>
                <span class="block text-primary-400">I AM GT</span>
              </h1>
              <p class="mt-3 text-base text-gray-800 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Ingresa conectando tu billetera electronica para poder empezar a generar y administrar las credenciales
              </p>
              <div class="mt-10 sm:mt-12">
                <form action="#" class="sm:mx-auto sm:max-w-xl lg:mx-0">
                  <p class="mt-3 text-sm text-gray-700 sm:mt-4">
                    El uso de esta aplicación esta reservado únicamente para personal autorizado puedes ver en nuestros <a href="#" class="font-medium text-white">términos de servicio</a>.
                  </p>
                </form>
              </div>
            </div>
          </div>
          <div class="mx-16 mt-12 mb-16 md:mx-8 md:mt-8 md:mb-8 lg:relative lg:m-0 bg-white rounded-2xl">
            <div class="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
              <!-- Illustration taken from Lucid Illustrations: https://lucid.pixsellz.io/ -->
              <lottie-player
                class="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                src="https://assets1.lottiefiles.com/packages/lf20_hokifDNfXn.json"
                background="transparent"
                speed="1"
                loop
                autoplay
              ></lottie-player>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- More main page content here... -->
  </div>
</template>

<script>
import * as LottiePlayer from "@lottiefiles/lottie-player";
export default {
  name: "Login",
};
</script>