<template>
  <div>
    <div class="text-3xl font-bold text-gray-900 tracking-wide">Crear dispensador</div>
    <hr class="mt-3 dark:border-primary-400 border-t-2 rounded mb-8" />
    <div class="flex flex-row items-start">
      <img class="hidden sm:block md:w-1/3 w-1/2 aspect-square bg-cover bg-primary-50 border-primary-100 border-2 mr-4 rounded" v-if="nftLogoPreview" :src="nftLogoPreview" />
      <div v-else class="hidden md:w-1/3 w-1/2 aspect-square rounded bg-primary-50 mr-4 border-primary-100 border-2 text-sm p-2 text-center sm:flex sm:flex-col place-content-center">
        Preview de la colección seleccionada
      </div>
      <div class="flex flex-col grow gap-y-4">
        <div class="flex flex-wrap gap-x-4 gap-y-6 items-center justify-center w-full">
          <img class="sm:hidden h-36 w-36 bg-cover bg-primary-50 border-primary-100 border-2 rounded" v-if="nftLogoPreview" :src="nftLogoPreview" />
          <div v-else class="sm:hidden h-36 w-36 rounded bg-primary-50 border-primary-100 border-2 text-sm justify-center items-center p-2 text-center flex flex-col place-content-center">
            Preview de la colección seleccionada
          </div>
          <!-- No hay nfts para mostrar -->
          <div class="w-full">
            <input-label class="mb-3" text="Credencial para dispensador" />
            <v-select
              placeholder="Seleccionar credencial"
              :options="nfts"
              :reduce="(o) => o"
              :getOptionLabel="(option) => option.name"
              :getOptionKey="(nft) => (nft.metadataAddress ? nft.metadataAddress.toBase58() : nft.address.toBase58())"
              :loading="isLoadingNfts && nfts.length == 0"
              v-model="nftCollection"
            />
          </div>
        </div>
        <v-input name="itemsAvailable" label="Número de items disponibles en este dispensador" placeholder="Ingresa el número de items disponibles en el dispensador" />
        <v-input name="price" label="Precio de cada credencial" placeholder="Ingresa el precio en sols para cada credencial" />

        <div class="flex flex-row flex-wrap">
          <div class="sm:w-1/2 w-full p-1">
            <v-cancel-button :disabled="isCreating" @click="$router.back()" class="h-10 w-full rounded-md"> Atras </v-cancel-button>
          </div>
          <div class="sm:w-1/2 w-full p-1">
            <v-primary-button
              @click="createCandyMachine"
              :disabled="!isValid || isCreating"
              class="h-10 w-full rounded-md"
              color="bg-green-400 hover:bg-green-500 focus:ring-green-800 active:bg-green-700"
            >
              {{ !isCreating ? "Confirmar" : "Cargando" }}
            </v-primary-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { computed, onMounted } from "@vue/runtime-core";
import { useForm } from "vee-validate";
import { useWorkspace } from "@/composables";
import { sol, toBigNumber, toDateTime } from "@metaplex-foundation/js";
import InputLabel from "@/components/inputs/InputLabel.vue";
import { ADD_CREATED_MACHINE } from "@/store/connection/types.js";
import { notify } from "@kyvg/vue3-notification";
import { useRouter } from "vue-router";
import { PublicKey } from "@solana/web3.js";

export default {
  components: {
    InputLabel,
  },
  setup() {
    const { metaplex } = useWorkspace();

    const nftCollection = ref(null);
    const isLoadingNfts = ref(false);
    const store = useStore();

    const isCreating = ref(false);
    const router = useRouter();

    //Const form schema
    const formSchema = {
      // nftCollection: "required",
      itemsAvailable: "required|integer|min_value:1|max_value:100",
      price: "required|min_value:0.01",
    };
    //Form values
    const { values, meta } = useForm({
      validationSchema: formSchema,
    });

    //Computed
    const nftLogoPreview = computed(() => {
      if (nftCollection.value) {
        return nftCollection.value.json.image;
      }
      return null;
    });
    const nfts = computed(() => store.getters.nftsModels);
    const isValid = computed(() => meta.value.valid && nftCollection.value);
    // const isValid = computed(() => true);

    async function fetchNfts() {
      isLoadingNfts.value = true;
      await store.dispatch("getNftFromCreator", true);
      isLoadingNfts.value = false;
    }

    const createCandyMachine = async () => {
      isCreating.value = true;

      const _nftCollection = nftCollection.value;
      const client = await metaplex.value.candyMachinesV2();
      try {
        const { data } = await _axios.post("/create/dispenser", {
          name: _nftCollection.name,
          price: values.price,
          itemsAvailable: values.itemsAvailable,
          address: _nftCollection.address,
          uri: _nftCollection.uri,
        });
        const candyMachineFound = await client.findByAddress({ address: new PublicKey(data.address) });

        store.commit(ADD_CREATED_MACHINE, candyMachineFound);

        notify({
          type: "success",
          title: "Se creo exitosamente!",
          text: "Dispensador creado exitosamente",
        });
        router.push("/dispensers");
      } catch (error) {
        console.error(error);
        notify({
          type: "error",
          title: "Error al crear el dispensador 🍬",
          text: "Por favor prueba nuevamente crear el dispensador",
        });
      }
      isCreating.value = false;
    };

    onMounted(() => {
      fetchNfts();
    });
    return {
      nfts,
      isValid,
      nftLogoPreview,
      createCandyMachine,
      isCreating,
      isLoadingNfts,
      nftCollection,
    };
  },
};
</script>