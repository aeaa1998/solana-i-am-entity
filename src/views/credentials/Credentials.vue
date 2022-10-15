<template>
  <nft-detail-modal v-if="isVisibleModal" v-model:isVisible="isVisibleModal" v-model:nft="selectedNft" />
  <div class="flex flex-col">
    <!-- Title -->
    <div class="flex items-center justify-between">
      <div class="text-3xl font-bold text-gray-900 tracking-wide">Tus credenciales</div>
      <v-primary-button @click="$router.push('/credentials/create')" class="rounded-full flex flex-col items-center" style="min-width: 40px; height: 40px">
        <div class="flex items-center px-2">
          <div class="mr-3 hidden sm:block">Agregar credencial</div>
          <font-awesome-icon icon="fa-solid fa-plus" />
        </div>
      </v-primary-button>
    </div>
    <hr class="mt-3 dark:border-primary-400 border-t-2 rounded mb-8" />
    <v-spinner class="self-center" v-if="isLoadingNfts" />
    <div v-else-if="nfts.length" class="flex flex-wrap flex-row gap-4">
      <!-- Cards -->
      <nft-card v-for="nft in nfts" @click="() => manageNftClick(nft)" :key="nft.metadataAddress ? nft.metadataAddress.toBase58() : nft.address.toBase58()" :nft="nft" />
    </div>
    <!-- Empty view -->
    <template v-else>
      <lottie-player
        class="self-center mt-4"
        src="https://assets4.lottiefiles.com/private_files/lf30_e3pteeho.json"
        background="transparent"
        speed="1"
        style="width: 300px; height: 300px"
        loop
        autoplay
      ></lottie-player>
      <div class="text-xl font-semibold text-center mt-2">Sin credenciales disponibles</div>
    </template>
  </div>
</template>
<script>
import * as LottiePlayer from "@lottiefiles/lottie-player";
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import NftCard from "@/components/nfts/NftCard.vue";
import { NftDetailModal } from "@/components";
import { useWorkspace } from "@/composables";
export default {
  components: {
    NftCard,
    NftDetailModal,
  },
  setup() {
    const store = useStore();
    const isLoadingNfts = ref(false);
    const isVisibleModal = ref(false);
    const selectedNft = ref(null);
    const nfts = computed(() => store.getters.nftsModels);

    async function fetchNfts() {
      isLoadingNfts.value = true;
      await store.dispatch("getNftFromCreator", true);
      isLoadingNfts.value = false;
    }

    onMounted(() => {
      fetchNfts();
    });

    const setSelected = (nft) => {
      selectedNft.value = nft;
      isVisibleModal.value = true;
    };

    watch(isVisibleModal, (newValue) => {
      // It is not visible
      if (!newValue) {
        selectedNft.value = null;
      }
    });

    const manageNftClick = (nft) => {
      if (nft.model != "metadata") {
        setSelected(nft);
      }
    };

    return {
      nfts,
      isLoadingNfts,
      setSelected,
      selectedNft,
      isVisibleModal,
      manageNftClick,
    };
  },
};
</script>