<template>
  <div class="flex flex-col">
    <div class="text-3xl font-bold text-gray-900 tracking-wide">Dashboard</div>
    <hr class="mt-3 dark:border-primary-400 border-t-2 rounded mb-8" />
    <v-spinner v-if="isLoading" class="h-16 w-16 self-center" />
    <div v-else class="flex flex-wrap w-full gap-4">
      <!-- Card for best candy machines -->
      <div class="rounded bg-primary-50 px-8 py-3 relative w-full sm:w-1/2 md:w-1/2 lg:w-1/3">
        <h2 class="text-lg font-semibold text-left mb-4">Dispensadores más populares</h2>
        <bar :chart-data="topDispensersData" :chart-options="chartOptions" cssClasses="" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from "vue-demi";
import { useStore } from "vuex";
import { orderBy } from "lodash";
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
const chartScaffold = { labels: [], datasets: [{ data: [] }] };
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const isLoadingCandyMachines = ref(false);
const isLoadingNfts = ref(false);
const store = useStore();
const candyMachines = computed(() => store.getters.candyMachines);
const nfts = computed(() => store.getters.nftsModels);

const isLoading = computed(() => isLoadingCandyMachines.value || isLoadingNfts.value);

const topDispensers = computed(() => orderBy(candyMachines.value, ["itemsMinted"], ["desc"]).splice(0, 5));

const chartOptions = {
  responsive: true,
  plugin: {
    legend: { display: false },
  },
  scales: {
    y: {
      min: 0,
      suggestedMax: 100,
    },
  },
};

const topDispensersData = computed(() =>
  topDispensers.value.reduce(
    (acc, dispenser) => {
      acc.labels.push(dispenser.symbol);
      acc.datasets[0].data.push(dispenser.itemsMinted.toNumber());
      return acc;
    },
    { ...chartScaffold }
  )
);

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

onMounted(() => {
  fetchMachines();
  fetchNfts();
});
</script>