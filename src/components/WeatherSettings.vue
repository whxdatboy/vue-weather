<template>
  <div class="weather-settings">
    <div class="weather-cities-list">
      <div class="weather-cities-list__title">List of cities</div>
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
          <SvgIcon :name="'delete'" />
        </div>
      </div>
    </div>

    <div class="weather-settings-add">
      <div class="form-group">
        <label class="form-label">
          <input
            v-model="name"
            type="text"
            placeholder="Search"
            class="form-input weather-settings-add_input" />
        </label>
        <button
          type="button"
          class="weather-settings-add_button"
          @click="addNewCity">
          <SvgIcon :name="'search'" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCitiesStore } from '@/stores/CitiesStore.ts'

const citiesStore = useCitiesStore()
const name = ref('')

const addNewCity = () => {
  citiesStore.addNewCity(name.value)
  name.value = ''
}

const removeCity = id => {
  citiesStore.deleteCity(id)
}
</script>
