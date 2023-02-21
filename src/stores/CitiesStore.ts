import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apiGeocode } from '@/assets/js/consts'
import { Coords } from '@/types/consts'

export const useCitiesStore = defineStore('citiesStore', () => {
  const cities = ref<string[]>([])
  const initCoords = ref<Coords>({ longitude: 0, latitude: 0 })
  setCities()

  function setStartedCoords() {
    const initCoordsValue: string | null = localStorage.getItem('coords')

    if (typeof initCoordsValue === 'string') {
      initCoords.value = JSON.parse(initCoordsValue)
    }

    if (initCoords.value.longitude === 0 && initCoords.value.latitude === 0) {
      window.navigator.geolocation.getCurrentPosition(async pos => {
        initCoords.value.longitude = pos.coords.longitude
        initCoords.value.latitude = pos.coords.latitude
        localStorage.setItem('coords', JSON.stringify(initCoords.value))
        initCoords.value = JSON.parse(localStorage.getItem('coords') || '')

        const response = await fetch(apiGeocode(initCoords.value))
        const weather = await response.json()
        const cityName = await weather.response.GeoObjectCollection
          .featureMember[0].GeoObject.name
        await addNewCity(cityName)
      })
    }
  }

  function setCities() {
    const citiesLocalStorage = localStorage.getItem('cities')

    if (typeof citiesLocalStorage === 'string') {
      cities.value = JSON.parse(citiesLocalStorage)
    }
  }

  function addNewCity(city: string) {
    cities.value.push(city)
    localStorage.setItem('cities', JSON.stringify(cities.value))
  }

  function deleteCity(index: number) {
    cities.value.splice(index, 1)
    localStorage.setItem('cities', JSON.stringify(cities.value))
  }

  function deleteCityByName(city: string) {
    const index = cities.value.indexOf(city)
    deleteCity(index)
  }

  return {
    initCoords,
    cities,
    setStartedCoords,
    addNewCity,
    deleteCity,
    deleteCityByName
  }
})
