<template>
  <div class="font-sans">
    <div class="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100">
      <div class="relative sm:max-w-sm w-full">
        <div class="card bg-primary-400 shadow-lg w-full h-full rounded-3xl absolute transform -rotate-6"></div>
        <div class="card bg-red-400 shadow-lg w-full h-full rounded-3xl absolute transform rotate-6"></div>
        <div class="relative w-full rounded-3xl px-6 py-4 bg-gray-100 shadow-md">
          <label for="" class="block mt-3 text-sm text-gray-700 text-center font-semibold"> Registrate </label>
          <form method="#" action="#" class="mt-10">
            <div>
              <v-input v-model="registration.firstName" placeholder="Primer nombre" />
            </div>

            <div class="mt-7">
              <v-input v-model="registration.lastName" placeholder="Apellidos" />
            </div>

            <div class="mt-7">
              <v-input v-model="registration.email" type="email" placeholder="Correo electronico" />
            </div>

            <div class="mt-7">
              <v-input v-model="registration.passwordConfirmation" type="password" placeholder="Confirmar constraseña" />
            </div>

            <div class="mt-7">
              <v-rounded-btn class="bg-primary-500 w-full text-white"> Registrarse </v-rounded-btn>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  components: {},
  data: () => ({
    registration: {
      email: null,
      password: null,
      passwordConfirmation: null,
      firstName: null,
      lastName: null,
    },
  }),
};
</script>
