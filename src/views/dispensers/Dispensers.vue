 <template>
  <div class="flex flex-col">
    <!-- Title -->
    <div class="flex items-center justify-between">
      <div class="text-3xl font-bold text-gray-900 tracking-wide">Dispensadores</div>
      <v-primary-button @click="$router.push('/dispensers/create')" class="rounded-full flex flex-col items-center" style="min-width: 40px; height: 40px">
        <div class="flex items-center px-2">
          <div class="mr-3 hidden sm:block">Agregar dispensador</div>
          <font-awesome-icon icon="fa-solid fa-plus" />
        </div>
      </v-primary-button>
    </div>
    <hr class="mt-3 dark:border-primary-400 border-t-2 rounded mb-4" />

    <p>Crea dispensadores para tus nft, con estos los usuarios finales podran comprarlos dependiendo de los requisitos que se asocien 😁.</p>
    <v-spinner class="my-4" v-if="isLoading" />
    <template v-else-if="!dispensers.length">
      <lottie-player
        class="self-center mt-4"
        src="https://assets4.lottiefiles.com/private_files/lf30_e3pteeho.json"
        background="transparent"
        speed="1"
        style="width: 300px; height: 300px"
        loop
        autoplay
      ></lottie-player>
      <div class="text-xl font-semibold text-center mt-2">Sin disponsadores disponibles</div>
    </template>
    <div v-else class="w-full flex flex-row flex-wrap gap-x-4 gap-y-2 mt-4">
      <CandyMachineCard v-for="dispenser in dispensers" :key="dispenser.address.toBase58()" :candyMachine="dispenser" />
    </div>
  </div>
</template>
<script>
import * as LottiePlayer from "@lottiefiles/lottie-player";
import { CandyMachineCard } from "@/components";
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { useWorkspace } from "@/composables";
import { toBigNumber, sol, toDateTime } from "@metaplex-foundation/js";
import { Metaplex } from "@metaplex-foundation/js";
import { Connection, Keypair } from "@solana/web3.js";

export default {
  components: {
    CandyMachineCard,
  },
  setup() {
    const { metaplex, wallet } = useWorkspace();
    const store = useStore();
    const isLoading = ref(false);
    const dispensers = computed(() => store.getters.candyMachines);
    const nfts = computed(() => store.getters.nfts);
    async function fetchMachines() {
      isLoading.value = true;
      await store.dispatch("getCandyMachines");
      isLoading.value = false;
    }

    onMounted(() => {
      fetchMachines();
    });

    return {
      dispensers,
      isLoading,
    };
  },
};
</script>