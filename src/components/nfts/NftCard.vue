<template>
  <div
    @click="(e) => $emit('click', e)"
    class="transition ease-in-out hover:scale-110 duration-300 w-60 h-60 bg-white rounded-lg flex flex-col justify-end bg-cover shadow-lg bg-center"
    :class="{
      'cursor-pointer': nft.model != 'metadata',
    }"
    :style="styleBg"
  >
    <div class="px-1 py-1">
      <div class="text-white text-white px-2 py-1 bg-gray-900/80 rounded-lg">
        <div class="text-sm font-bold h-8 flex flex-col">
          {{ nft.name }}
        </div>
        <div v-if="description" class="text-xs">
          {{ description }}
        </div>
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
          "background-repeat": "no-repeat",
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