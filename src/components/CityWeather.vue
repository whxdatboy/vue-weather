<template>
  <div
    class="weather"
    :class="theme">
    <div
      class="weather-gear"
      @click="settingsOpen = !settingsOpen">
      <SvgIcon name="gear" />
    </div>
    <div
      v-if="!settingsOpen"
      class="weather-wrap">
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
    <WeatherSettings v-if="settingsOpen" />
  </div>
</template>

<script setup>
import { ref, defineAsyncComponent, computed } from 'vue'
import { getTheme } from '@/assets/js/functions.js'
import WeatherSettings from 'components/WeatherSettings.vue'

const theme = computed(() => {
  return `theme-${getTheme()}`
})

const WeatherItem = defineAsyncComponent(() => {
  return new Promise((resolve, reject) => {
    resolve(import('components/WeatherItem.vue'))

    reject(error => console.log(error))
  })
})

const settingsOpen = ref(false)

const props = defineProps({
  citiesArray: {
    type: Array,
    required: true
  }
})
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
