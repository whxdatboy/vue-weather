<template>
  <svg
    class="icon"
    :class="iconId">
    <use :href="url" />
  </svg>
</template>
<script setup>
import { ref } from 'vue'
// import appIconId from 'icons/sprite.svg'
const props = defineProps({
  name: {
    type: String,
    required: true
  }
})

const iconId = ref(`icon-${props.name}`)
const iconName = ref(`${props.name}`)
// const url = ref(`/icons/${iconId.value}.svg`)
</script>

<style scoped></style>
