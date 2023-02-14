<template>
  <div class="weather">
    <div class="weather-gear" />
    <Suspense>
      <template #fallback>
        <div class="weather-loader">Loading...</div>
      </template>
      <WeatherItem
          v-for="(city, id) in props.citiesArray"
          :key="id"
          :city="city" />
    </Suspense>
  </div>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue'

const WeatherItem = defineAsyncComponent(() => {
  return new Promise((resolve, reject) => {
    resolve(import('components/WeatherItem.vue'))

    reject(error => console.log(error))
  })
})

const props = defineProps({
  citiesArray: {
    type: Array,
    required: true
  }
})
</script>