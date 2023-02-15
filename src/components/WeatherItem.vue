<template>
  <div class="weather-item">
    <!--    <div class="text-red-400">{{ weather }}</div>-->
    <div class="weather-item-content">
      <div class="weather-item-row weather-item-head">
        <div class="weather-item-name">
          {{ weather.city }}
          <span class="weather-item-country">{{ weather.country }}</span>
        </div>
      </div>
      <div class="weather-item-row">
        <div class="weather-item-temperature">
          {{ weather.temp }}
        </div>
        <div class="weather-item-icon">
          <img
            :src="imageUrl"
            alt="Icon of weather" />
        </div>
      </div>
      <div class="weather-item-row">
        <div class="weather-item-text">
          Feels like
          {{ weather.feels_like }}.&nbsp;{{ weather.main }}.&nbsp;{{ weather.description }}
        </div>
      </div>
      <div class="weather-item-row weather-wind">
        <div class="weather-wind-info">
          {{ weather.speed }} m/s. {{ weather.direction }}
        </div>

        <div class="weather-item-pressure weather-item-row">
          <div class="icon" />
          <div class="weather-item-pressure__value">
            {{ weather.pressure }} hPa
          </div>
        </div>
      </div>
      <div class="weather-item-list">
        <div class="weather-item-row">Humidity {{ weather.humidity }}%</div>
        <div class="weather-item-row">
          Visibility {{ (weather.visibility / 1000).toFixed(1) }} km
        </div>
      </div>
    </div>
  </div>
</template>

<script async setup>
import { ref } from 'vue'
import { windDirection } from '@/assets/js/consts.js'
import {
  toUpper,
  getWeather,
  temperatureRounding
} from '@/assets/js/functions.js'

const props = defineProps({
  city: {
    type: String,
    required: true
  }
})
const weather = await ref({})
let response = await getWeather(props.city)

if (response) {
  try {
    weather.value = {
      city: response.name,
      country: response.sys.country,
      temp: temperatureRounding(response.main.temp),
      feels_like: temperatureRounding(response.main.feels_like),
      pressure: response.main.pressure,
      main: toUpper(response.weather[0].main),
      description: toUpper(response.weather[0].description),
      speed: response.wind.speed,
      direction: windDirection(response.wind.deg),
      icon: response.weather[0].icon,
      humidity: response.main.humidity,
      visibility: response.visibility
    }
  } catch (error) {
    throw new Error(error)
  }

  response = null
}

const imageUrl = new URL(`@/assets/images/`, import.meta.url)
imageUrl.href += `/${weather.value.icon}.svg`
</script>
