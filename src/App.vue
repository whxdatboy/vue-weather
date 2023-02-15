<template>
  <div class="container mx-auto px-4">
    <CityWeather :cities-array="citiesStore.cities" />
  </div>
</template>

<script setup>
import { onBeforeMount } from 'vue'
import { useCitiesStore } from '@/stores/CitiesStore.js'
import CityWeather from 'components/CityWeather.vue'

const citiesStore = useCitiesStore()

onBeforeMount(() => {
  if (citiesStore.cities.length === 0) {
    citiesStore.setStartedCoords()
    citiesStore.setStartedCity()
  }
})
</script>
<style scoped>
header {
  line-height: 1.5;
}

.block {
  margin-top: 15px;
  width: 150px;
  height: 100px;
  border: 1px solid lightgreen;
}

.block.ready {
  border-color: forestgreen;
}
</style>
