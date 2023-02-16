import { apiWeather } from '@/assets/js/consts.js'

export const getWeather = async city => {
  try {
    const response = await fetch(apiWeather(city))
    return await response.json()
  } catch (error) {
    console.log(error)
    return false
  }
}
export const toUpper = (string = '') => {
  const firstLetter = string.slice(0, 1).toUpperCase()
  const otherString = string.slice(1).toLowerCase()
  return firstLetter + otherString
}
export const temperatureRounding = number => {
  return number > 0 ? Math.ceil(number) : Math.floor(number)
}

export const getTheme = () => {
  let theme = ''
  const time = new Date().getHours()
  const dayZone = {
    start: 6,
    end: 21
  }

  if (dayZone.end > time && time > dayZone.start) {
    theme = 'day'
  } else {
    theme = 'night'
  }

  return theme
}
