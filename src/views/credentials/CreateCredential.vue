<template>
  <div>
    <div class="text-3xl font-bold text-gray-900 tracking-wide">Crear nueva credencial</div>
    <hr class="mt-3 dark:border-primary-400 border-t-2 rounded mb-8" />
    <div class="flex flex-row items-start">
      <img class="hidden md:block md:w-1/3 w-1/2 aspect-square bg-cover bg-primary-50 border-primary-100 border-2 mr-4 rounded" v-if="nftLogoPreview" :src="nftLogoPreview" />
      <div v-else class="hidden md:w-1/3 w-1/2 aspect-square rounded bg-primary-50 mr-4 border-primary-100 border-2 text-sm p-2 text-center md:flex md:flex-col place-content-center">
        Preview de la imágen seleccionada
      </div>
      <div class="flex flex-col grow gap-y-4">
        <div class="flex flex-wrap gap-x-4 gap-y-6 items-center justify-center w-full">
          <img class="md:hidden h-36 w-36 bg-cover bg-primary-50 border-primary-100 border-2 rounded" v-if="nftLogoPreview" :src="nftLogoPreview" />
          <div v-else class="md:hidden h-36 w-36 rounded bg-primary-50 border-primary-100 border-2 text-sm justify-center items-center p-2 text-center flex flex-col place-content-center">
            Escoje una imágen
          </div>
          <v-file-input
            :previewsImage="false"
            class="sm:w-full grow"
            accept="image/png, image/jpeg, image/jpg"
            name="nftLogo"
            label="Imágen de la credencial"
            rules="required|mimes:image/jpeg,image/jpg,image/png|size:2048"
          />
        </div>
        <v-input name="nftName" label="Nombre de la credencial" placeholder="Ingresa el nombre de la credencial" rules="required|min:2|max:20" />
        <v-input name="nftSymbol" label="Símbolo de la credencial" placeholder="Ingresa el nombre de la credencial" rules="required|min:2|max:10" />
        <v-text-area :rows="8" name="nftDescription" label="Descripción de la credencial" placeholder="Ingresa la descripción de la credencial" rules="required|min:8|max:56" />
        <v-checkbox name="expires" label="Expira la credencial?" />
        <template v-if="values.expires">
          <div class="w-full flex flex-wrap">
            <v-select
              wrapperClass="w-full md:w-1/3 px-0 md:pr-2"
              name="days"
              label="Días en los que expira"
              placeholder="Seleccione la cantidad de días"
              :options="timeOptions.days"
              :getOptionLabel="(option) => `${option} días`"
              rules="required"
            />
            <v-select
              wrapperClass="w-full md:w-1/3 px-0 md:px-2"
              name="months"
              label="Meses en los que expira"
              placeholder="Seleccione la cantidad de meses"
              :options="timeOptions.months"
              :getOptionLabel="(option) => `${option} meses`"
              rules="required"
            />
            <v-select
              wrapperClass="w-full md:w-1/3 px-0 md:pl-2"
              name="years"
              label="Años en los que expira"
              placeholder="Seleccione la cantidad de años"
              :options="timeOptions.years"
              :getOptionLabel="(option) => `${option} años`"
              rules="required"
            />
          </div>
        </template>

        <v-v-select
          label="Requisitos"
          placeholder="Selecciona las credenciales"
          :options="nfts"
          multiple
          :getOptionLabel="(option) => option.name"
          :reduce="(nft) => nft.address.toBase58()"
          :loading="isLoadingNfts && nfts.length == 0"
          name="nftsToAdd"
        />

        <div class="flex flex-row flex-wrap">
          <div class="sm:w-1/2 w-full p-1">
            <v-cancel-button :disabled="isCreating" @click="$router.push('/credentials')" class="h-10 w-full rounded-md"> Atras </v-cancel-button>
          </div>
          <div class="sm:w-1/2 w-full p-1">
            <v-primary-button @click="createNft" :disabled="!isValid || isCreating" class="h-10 w-full rounded-md">
              {{ !isCreating ? "Confirmar" : "Cargando" }}
            </v-primary-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, onMounted, ref, watch } from "vue";
import VInput from "@/components/VInput.vue";
import { useForm } from "vee-validate";
import axios from "axios";
import { useAnchorWallet } from "solana-wallets-vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

export default {
  components: { VInput },
  setup() {
    const timeOptions = {
      days: [...Array(32).keys()],
      months: [...Array(13).keys()],
      years: [...Array(11).keys()],
    };
    const store = useStore();
    const router = useRouter();
    const isLoadingNfts = ref(false);
    const isCreating = ref(false);

    const { values, meta } = useForm();

    //Computed properties
    const isTimeStampsValid = computed(() => !values.expires || [values.days, values.months, values.years].some((a) => a > 0));
    const timeStampsValue = computed(() => {
      if (!values.expires) return null;
      return {
        years: values.years,
        months: values.months,
        days: values.days,
      };
    });
    const isValid = computed(() => meta.value.valid && isTimeStampsValid.value);
    // const isValid = computed(() => true);
    const nftLogo = computed(() => values.nftLogo);
    const nftName = computed(() => values.nftName);
    const nftDescription = computed(() => values.nftDescription);
    const nfts = computed(() => store.getters.nftsModels);
    const nftLogoPreview = computed(() => {
      try {
        return URL.createObjectURL(nftLogo.value);
      } catch (error) {
        return null;
      }
    });

    async function createNft() {
      //Now we have to create the program
      isCreating.value = true;
      let body = { title: nftName.value, description: nftDescription.value, image: nftLogo.value, requisites: values.nftsToAdd ?? [], model: "credential", symbol: values.nftSymbol };
      if (timeStampsValue.value) {
        body.expiration = { ...timeStampsValue.value };
      }
      const created = await store.dispatch("createNft", body);
      isCreating.value = false;
      //It was successfull
      if (created) {
        router.back();
      }
    }

    async function fetchNfts() {
      if (!nfts.value.length) {
        isLoadingNfts.value = true;
        await store.dispatch("getNftFromCreator", true);
        isLoadingNfts.value = false;
      }
    }

    onMounted(() => {
      fetchNfts();
    });

    return {
      timeOptions,
      isValid,
      nftLogo,
      nftLogoPreview,
      nftName,
      nftDescription,
      createNft,
      isCreating,
      nfts,
      isLoadingNfts,
      values,
    };
  },
};
</script>