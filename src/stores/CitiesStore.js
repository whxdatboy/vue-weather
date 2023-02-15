import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiGeocode, apiWeather } from '@/assets/js/consts.js'

export const useCitiesStore = defineStore('citiesStore', {
  state: () => ({
    cities: JSON.parse(localStorage.getItem('cities')) || [],
    initCoords: JSON.parse(localStorage.getItem('coords')) || {
      longitude: 0,
      latitude: 0
    }
  }),
  getters: {},
  actions: {
    setStartedCoords() {
      if (this.initCoords.longitude === 0 && this.initCoords.latitude === 0) {
        window.navigator.geolocation.getCurrentPosition(pos => {
          this.initCoords.longitude = pos.coords.longitude
          this.initCoords.latitude = pos.coords.latitude
          localStorage.setItem('coords', JSON.stringify(this.initCoords))
        })
      }
    },
    async setStartedCity() {
      const response = await fetch(apiGeocode(this.initCoords))
      const weather = await response.json()
      const cityName =
        weather.response.GeoObjectCollection.featureMember[0].GeoObject.name
      this.addNewCity(cityName)
    },
    addNewCity(city) {
      this.cities.push(city)
      localStorage.setItem('cities', JSON.stringify(this.cities))
    },
    deleteCity(index) {
      this.cities.splice(index, 1)
      localStorage.setItem('cities', JSON.stringify(this.cities))
    }
  }
})
