<template>
  <div
    @click="(e) => $emit('click', e)"
    class="transition ease-in-out hover:scale-110 duration-300 w-60 h-60 bg-primary-50 rounded flex flex-col justify-end border-2 border-primary-200 bg-cover"
    :class="{
      'cursor-pointer': nft.model != 'metadata',
    }"
    :style="styleBg"
  >
    <div class="text-black text-white px-1 py-1 bg-primary-200">
      <div class="text-sm font-bold h-8 flex flex-col">
        {{ nft.name }}
      </div>
      {{ nft.mint ? nft.mint.address.toBase58() : nft.mintAddress.toBase58() }}
      <div v-if="description" class="text-xs">
        {{ description }}
      </div>
    </div>
  </div>
</template>
<script>
import { toRef, toRefs } from "@vue/reactivity";
import { computed, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useWorkspace, getAccountMetaData } from "@/composables";
export default {
  props: ["nft"],
  setup(props) {
    const store = useStore();
    const { nft } = toRefs(props);
    const json = computed(() => nft.value.json);

    const styleBg = computed(() => {
      //If the json is ther
      if (nft.value.json) {
        return {
          "background-image": `url(${nft.value.json.image})`,
        };
      }
      return {};
    });

    const description = computed(() => (json.value ? json.value.description : null));

    //Function

    //Lifecycle
    onMounted(() => {
      //Load the metadata when nft card is presented
      if (nft.value.model == "metadata") {
        getAccountMetaData(nft.value, store);
        //Get also the transactions
        store.dispatch("getNftTransactions", nft.value);
      }
    });

    return {
      styleBg,
      description,
    };
  },
};
</script>