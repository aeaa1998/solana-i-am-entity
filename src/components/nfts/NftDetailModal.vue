<template>
  <modal v-model="isVisibleModal" class="w-full sm:w-5/6 md:w-4/6 max-h-full rounded" classWrapper="!max-h-full">
    <div class="bg-white p-6 flex-col max-h-full overflow-y-auto rounded-lg" v-if="isVisibleModal && nft">
      <div class="text-4xl text-primary-500 font-bold">{{ nft.name }}</div>
      <div v-if="nftTransactionCreatedAt" class="text-lg fonst-semibold text-gray-700">
        Creado el: {{ new Date(nftTransactionCreatedAt.blockTime * 1000).toLocaleDateString("es-GT", { day: "numeric", year: "numeric", month: "short" }) }}
      </div>
      <line-tabs
        v-model="selectedTab"
        :tabs="tabs"
        tab-item-class="min-w-[100px] md:min-w-[200px] lg:min-w-[250px] xl:min-w-[350px] uppercase"
        class="mb-4 w-fit mx-auto"
        selectedColor="text-secondary-600 dark:text-secondary-500"
        selectedColorBorder="dark:border-secondary-500 border-secondary-600"
      >
        <template v-slot="{ item }">
          <div class="flex flex-row gap-x-2 justify-center items-center">
            <font-awesome-icon :icon="`fa-solid ${item.icon}`" />
            <div>{{ item.title }}</div>
          </div>
        </template>
      </line-tabs>
      <div v-if="selectedTab == 0" class="w-full grow">
        <div class="grid grid-cols-4 gap-4 h-full overflow-y-auto gap-y-2">
          <div class="col-span-4 lg:col-span-1">
            <img class="w-full aspect-square bg-cover border-secondary-400 rounded-xl shadow-lg" v-if="imageSrc" :src="imageSrc" />
            <div class="my-3">
              <div class="text-lg">Descripción de la credencial</div>
              <hr class="border-t-2 rounded mt-1 border-primary-800" />
            </div>
            <p class="text-sm rounded min-h-[12rem] border-2 shadow border-primary-200 p-2">{{ description }}</p>
            <div class="my-3">
              <div class="text-lg">Expira la credencial?</div>
              <hr class="border-t-2 rounded mt-1 border-primary-800" />
              <p v-if="!json.expiration">La credencial no expira</p>
              <p v-else>
                {{ expirationDate }}
              </p>
            </div>
          </div>
          <div class="col-span-4 lg:col-span-3 h-full">
            <!-- <div class="flex flex-wrap"> -->
            <h2 class="text-xl font-bold w-full mb-4">Dispensadores</h2>
            <v-spinner v-if="isLoadingCandyMachines" class="!w-8 !h-8" />
            <div class="text-sm w-full" v-else-if="!candyMachines || !candyMachines.length">No se le han configurado dispensadores a la credencial</div>
            <ul v-else role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <candy-machine-card
                :hover="false"
                v-for="(candyMachine, index) in candyMachines"
                :number="index + 1"
                :candyMachine="candyMachine"
                :key="candyMachine.address.toBase58()"
                class="mb-2 last:mb-0"
              />
            </ul>
          </div>
        </div>
      </div>
      <div v-else class="min-h-[280px]">
        <div class="w-full flex items-center mb-4" :class="{ 'justify-between': !createMode, 'gap-x-4': createMode }">
          <h2 :class="{ 'order-last': createMode }" class="text-xl font-bold">Requisitos</h2>
          <v-primary-button
            :disabled="creatingNft"
            padding="p-0"
            @click="createMode = !createMode"
            class="rounded-full flex flex-col place-items-center place-content-center"
            style="width: 25px; height: 25px"
          >
            <font-awesome-icon :icon="`fa-solid ${!createMode ? 'fa-plus' : 'fa-chevron-left'}`" />
          </v-primary-button>
        </div>
        <template v-if="!createMode">
          <v-spinner v-if="isLoadingNfts" class="!w-8 !h-8" />
          <div class="text-sm w-full" v-else-if="!nftsRequisites.length">No se le han configurado requisitos a la credencial haz click en el '+' para empezar</div>
          <div class="w-full flex flex-wrap gap-4">
            <nft-card v-for="nft in nftsRequisites" :key="nft.metadataAddress ? nft.metadataAddress.toBase58() : nft.address.toBase58()" :nft="nft" />
          </div>
        </template>
        <div v-else class="w-full flex-col flex gap-y-4">
          <v-select
            placeholder="Selecciona las credenciales"
            label="Credenciales como requisitos"
            :options="nfts"
            multiple
            :initialValue="nftsRequisites.map((_nft) => _nft.address.toBase58())"
            :getOptionLabel="(option) => option.name"
            :reduce="(nft) => nft.address.toBase58()"
            :loading="isLoadingNfts && nfts.length == 0"
            v-model="nftsToAdd"
          />

          <v-primary-button @click="updateNft" :disabled="creatingNft" class="h-10 w-full rounded-md">
            {{ !creatingNft ? "Confirmar" : "Cargando" }}
          </v-primary-button>
        </div>
      </div>
    </div>
  </modal>
</template>
<script setup>
import { computed, onMounted, ref, toRef, toRefs, watch } from "vue-demi";
import { useStore } from "vuex";
import { CandyMachineCard, LineTabs, NftCard } from "@/components";
import InputLabel from "@/components/inputs/InputLabel.vue";

const props = defineProps({
  isVisible: {
    type: Boolean,
  },
  nft: {
    type: Object,
  },
});

const emit = defineEmits(["update:isVisible", "update:nft"]);
const store = useStore();

const tabs = [
  {
    title: "Información",
    icon: "fa-info",
  },
  {
    title: "Requisitos",
    icon: "fa-key",
  },
];

const getRecursiveDependants = (dependants, check) => {
  check.forEach((dep) => {
    const found = store.getters.dependenciesMapped[dep.address.toBase58()];
    if (found && found.length) {
      dependants.push(...found);
      //Check if dependant has dependencies
      getRecursiveDependants(dependants, found);
    }
  });
  return dependants;
};

const isLoadingNfts = ref(false);
const isLoadingCandyMachines = ref(false);
const createMode = ref(false);
const creatingNft = ref(false);

const selectedTab = ref(0);
const { nft, isVisible } = toRefs(props);
const json = computed(() => nft.value.json);
const mintAddress = computed(() => (nft.value.mint ? nft.value.mint.address : nft.value.mintAddress));

const expirationDate = computed(() => {
  if (json.value.expiration) {
    const { years, months, days } = json.value.expiration;
    return `La credencial expira ${years} ${years != 1 ? "años" : "año"}, ${months} ${months != 1 ? "meses" : "mes"} y ${days} ${days != 1 ? "días" : "día"} despues de emitida`;
  }
  return null;
});
const nftModels = computed(() => store.getters.nftsModels);
const nftTransactions = computed(() => store.getters.nftTransactionsMapped[mintAddress.value.toBase58()] ?? []);
const nftTransactionCreatedAt = computed(() => {
  const nftTransactionsTimed = nftTransactions.value.filter((t) => t.blockTime);
  if (!nftTransactionsTimed.length) return null;
  return nftTransactionsTimed[nftTransactionsTimed.length - 1];
});
//Get all the cycle dependencies
const dependants = computed(() => {
  const key = nft.value.address.toBase58();
  const dependants = store.getters.dependenciesMapped[key] ?? [];
  //Check for circular dependencies
  return getRecursiveDependants(dependants, dependants).map((nft) => nft.address.toBase58());
});
const nfts = computed(() => nftModels.value.filter((_nft) => _nft.address.toBase58() != nft.value.address.toBase58() && !dependants.value.includes(_nft.address.toBase58())));
const nftsRequisites = computed(() => nfts.value.filter((_nft) => (nft.value.json.requisites ?? []).includes(_nft.address.toBase58())));

const candyMachinesMintMapped = computed(() => store.getters.candyMachinesMintMapped);
const candyMachines = computed(() => {
  if (nft.value) {
    const key = nft.value.mint.address.toBase58();
    if (key in candyMachinesMintMapped.value) {
      return candyMachinesMintMapped.value[key];
    }
  }
  return [];
});

const nftsToAdd = ref([]);
const imageSrc = computed(() => {
  //If the json is ther
  if (!nft.value) return null;
  return nft.value.json.image;
});

const isVisibleModal = computed({
  get: () => isVisible.value,
  set: (value) => emit("update:isVisible", value),
});

async function fetchMachines() {
  //Only fetch if the machine is missing
  if (!candyMachines.value.length) {
    isLoadingCandyMachines.value = true;
    await store.dispatch("getCandyMachines");
    isLoadingCandyMachines.value = false;
  }
}

async function fetchNfts() {
  if (!nfts.value.length) {
    isLoadingNfts.value = true;
    await store.dispatch("getNftFromCreator", true);
    isLoadingNfts.value = false;
  }
}

async function updateNft() {
  creatingNft.value = true;
  const updatedNft = await store.dispatch("updateNft", {
    metadata: {
      requisites: nftsToAdd.value,
    },
    nft: nft.value,
  });
  creatingNft.value = false;
  createMode.value = false;
  if (updatedNft) {
    emit("update:nft", updatedNft);
  }
}

onMounted(() => {
  fetchMachines();
});

watch(selectedTab, (newValue) => {
  if (newValue) {
    fetchNfts();
  }
});

const description = computed(() => (json.value ? json.value.description : null));
</script>
<style scoped>
:deep(.i-am-wrapper) {
  max-height: 100%;
}
</style>