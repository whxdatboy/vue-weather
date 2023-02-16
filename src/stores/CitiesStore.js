import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apiGeocode } from '@/assets/js/consts.js'

export const useCitiesStore = defineStore('citiesStore', () => {
  const initCoords = ref(
    JSON.parse(localStorage.getItem('coords')) || {
      longitude: 0,
      latitude: 0
    }
  )

  const cities = ref(JSON.parse(localStorage.getItem('cities')) || [])

  function setStartedCoords() {
    if (initCoords.value.longitude === 0 && initCoords.value.latitude === 0) {
      window.navigator.geolocation.getCurrentPosition(async pos => {
        initCoords.value.longitude = pos.coords.longitude
        initCoords.value.latitude = pos.coords.latitude
        localStorage.setItem('coords', JSON.stringify(initCoords.value))
        initCoords.value = JSON.parse(localStorage.getItem('coords'))

        const response = await fetch(apiGeocode(initCoords.value))
        const weather = await response.json()
        const cityName = await weather.response.GeoObjectCollection
          .featureMember[0].GeoObject.name
        await this.addNewCity(cityName)
      })
    }
  }

  function addNewCity(city) {
    this.cities.push(city)
    localStorage.setItem('cities', JSON.stringify(this.cities))
  }

  function deleteCity(index) {
    this.cities.splice(index, 1)
    localStorage.setItem('cities', JSON.stringify(this.cities))
  }

  return {
    initCoords,
    cities,
    setStartedCoords,
    addNewCity,
    deleteCity
  }
})
