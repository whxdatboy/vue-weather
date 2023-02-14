<template>
  <div class="weather-item">
    <div class="text-red-400">{{ weather }}</div>
    <div class="weather-item-row flex">
      <div class="weather-item-name">
        {{ weather.city }}
        <span class="weather-item-country">{{ weather.country }}</span>
      </div>
    </div>
    <div class="weather-item-row flex">
      <div class="weather-item-temperature">
        {{ weather.temp }}
      </div>
      <div class="weather-item-icon">
        <img
          :src="imageUrl"
          alt="Icon of weather" />
      </div>
    </div>
    <div class="weather-item-row flex">
      <span class="weather-item-feels_like">
        Feels like
        {{ weather.feels_like }}.&nbsp;
      </span>

      <span class="weather-item-weather">
         {{ weather.main }}.&nbsp;
      </span>
      <span class="weather-item-description">
         {{ weather.description }}
      </span>
    </div>
    <div class="weather-item-row weather-wind flex">
      <div class="weather-wind-info">
        {{weather.speed}} m/s. {{ weather.direction }}
      </div>
    </div>
  </div>
</template>

<script async setup>
import { ref, computed } from 'vue'
import { getWeather, windDirection, toUpper, temperatureRounding } from '@/assets/js/consts.js'

const props = defineProps({
  city: {
    type: String,
    required: true
  }
})
const weather = await ref({})
let response = await getWeather(props.city)

if(response) {
  try {
    weather.value = {
      city: response.name,
      country: response.sys.country,
      temp: temperatureRounding(response.main.temp),
      feels_like: temperatureRounding(response.main.feels_like),
      main: toUpper(response.weather[0].main),
      description: toUpper(response.weather[0].description),
      speed: response.wind.speed,
      direction: windDirection(response.wind.deg),
      icon: response.weather[0].icon
    }
  } catch (error) {
    throw new Error(error)
  }

  response = null
}

const imageUrl = await new URL(`@/assets/images/`, import.meta.url)
imageUrl.href += `/${weather.value.icon}.svg`

</script>