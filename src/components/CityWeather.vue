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
          <div class="weather-loader">
            <div class="loader-item" />
          </div>
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

<script setup lang="ts">
import {
  ref,
  defineAsyncComponent,
  computed,
  Ref,
  ComputedRef,
  VueElement
} from 'vue'
import { getTheme } from '@/assets/js/functions'
import WeatherSettings from 'components/WeatherSettings.vue'

const theme: ComputedRef<string> = computed(() => {
  return `theme-${getTheme()}`
})

const WeatherItem = defineAsyncComponent(() => {
  return new Promise((resolve, reject) => {
    const weatherComponent = import('components/WeatherItem.vue')
    resolve(weatherComponent)

    reject((error: string) => console.log(error))
  })
}) as VueElement

const settingsOpen: Ref<boolean> = ref(false)

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
