<template>
  <div class="container mx-auto px-4 flex justify-center">
    <CityWeather :cities-array="citiesStore.cities" />
  </div>
</template>

<script setup>
import { onBeforeMount } from 'vue'
import { useCitiesStore } from '@/stores/CitiesStore.ts'
import CityWeather from 'components/CityWeather.vue'

const citiesStore = useCitiesStore()

onBeforeMount(async () => {
  if (citiesStore.cities.length === 0) {
    citiesStore.setStartedCoords()
  }
})
</script>
