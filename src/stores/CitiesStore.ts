import { defineStore } from 'pinia'
import { ref, Ref } from 'vue'
import { apiGeocode } from '@/assets/js/consts'
import { Coords } from '@/types/consts'

export const useCitiesStore = defineStore('citiesStore', () => {
  const initCoords: Ref<Coords> = ref(
    JSON.parse(localStorage.getItem('coords') || '') || {
      longitude: 0,
      latitude: 0
    }
  )

  const cities: Ref<string[]> = ref(
    JSON.parse(localStorage.getItem('cities') || '') || []
  )

  function setStartedCoords() {
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
