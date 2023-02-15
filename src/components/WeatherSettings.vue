<template>
  <div class="weather-settings">
    <div class="weather-cities-list">
      <div
        v-for="(city, i) in citiesStore.cities"
        :key="i"
        class="weather-cities-item flex justify-between">
        <div class="weather-cities-item-name">
          {{ city }}
        </div>
        <div
          class="weather-cities-item-delete"
          @click="removeCity(i)">
          удалить
        </div>
      </div>
    </div>

    <div class="weather-settings-add">
      <div class="form-group">
        <label class="form-label">
          <input
            v-model="name"
            type="text"
            class="form-input weather-settings-add_input" />
        </label>
        <button
          type="button"
          class="weather-settings-add_delete"
          @click="addNewCity">
          Добавить
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCitiesStore } from '@/stores/CitiesStore.js'

const citiesStore = useCitiesStore()
const name = ref('')

const addNewCity = () => {
  citiesStore.addNewCity(name.value)
  name.value = ''
}

const removeCity = i => {
  citiesStore.deleteCity(i)
}
</script>
