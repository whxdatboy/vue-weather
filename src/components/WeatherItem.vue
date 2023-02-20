<template>
  <div class="weather-item">
    <!--    <div class="text-red-400">{{ weather }}</div>-->

    <div
      v-if="errorResponse"
      class="weather-error weather-item-row justify-between">
      <div class="weather-error-text">
        This city <strong>'{{ errorText }}'</strong> is not found
      </div>
      <div
        class="weather-error-delete"
        @click="deleteCity(props.city)">
        <SvgIcon name="delete" />
      </div>
    </div>
    <div
      v-else
      class="weather-item-content">
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
          {{ weather.feels_like }}.&nbsp;{{ weather.main }}.&nbsp;{{
            weather.description
          }}
        </div>
      </div>
      <div class="weather-item-row weather-wind">
        <div class="weather-wind-info flex">
          {{ weather.speed }} m/s.
          <span class="weather-wind-icon">
            <SvgIcon
              name="compas"
              :style="{ transform: 'rotate(' + weather.deg + 'deg)' }" /> </span
          >{{ weather.direction }}
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

<script async setup lang="ts">
import { ref } from 'vue'
import { windDirection } from '@/assets/js/consts'
import { toUpper, getWeather, temperatureRounding } from '@/assets/js/functions'
import { IWeather } from '@/types/component-types'
import { useCitiesStore } from '@/stores/CitiesStore'

type city = string

const props = defineProps<{
  city: city
}>()

const cityStore = useCitiesStore()
const weather = ref<IWeather>({})
const errorText = ref<string>(`${props.city}`)
const errorResponse = ref<boolean>(false)

try {
  let response = await getWeather(props.city)
  console.log(response.name)
  console.log(response.wind.deg)
  if (parseInt(response.cod) === 200) {
    weather.value = {
      city: response.name,
      country: response.sys.country,
      temp: temperatureRounding(response.main.temp),
      feels_like: temperatureRounding(response.main.feels_like),
      pressure: response.main.pressure,
      main: toUpper(response.weather[0].main),
      description: toUpper(response.weather[0].description),
      speed: response.wind.speed,
      deg: response.wind.deg,
      direction: windDirection(response.wind.deg),
      icon: response.weather[0].icon,
      humidity: response.main.humidity,
      visibility: response.visibility
    }
    errorResponse.value = false
    response = null
  } else if (parseInt(response.cod) === 404) {
    errorResponse.value = true
    throw new Error(response.message)
  } else if (parseInt(response.cod) !== 200) {
    errorResponse.value = true
    throw new Error(response.message)
  }
} catch (error) {
  console.log(error)
}

const deleteCity = (city: string) => {
  cityStore.deleteCityByName(city)
}

const imageUrl = new URL(`@/assets/images/`, import.meta.url)
imageUrl.href += `/${weather.value.icon}.svg`
</script>
