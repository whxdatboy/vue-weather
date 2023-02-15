export const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather'
export const apiKey = '369796b51173a616a767443ffabf65b1'
const apiKeyGeocoder = 'f8d1318f-e2d1-48cd-b79a-2f0bfe1543f6'
const apiGeocoderUrl = 'https://geocode-maps.yandex.ru/1.x'

export const coords = { ...localStorage.getItem('cities') }
export const apiWeather = city => {
  return `${weatherUrl}?q=${city}&units=metric&appid=${apiKey}`
}

export const apiGeocode = coords => {
  return `${apiGeocoderUrl}?apikey=${apiKeyGeocoder}&geocode=${coords.longitude},${coords.latitude}&format=json&kind=locality&results=1`
}
export const windDirection = deg => {
  const directionArray = [
    {
      name: 'N',
      start: 0,
      end: 11.25
    },
    {
      name: 'NNE',
      start: 11.25,
      end: 33.75
    },
    {
      name: 'NE',
      start: 33.75,
      end: 56.25
    },
    {
      name: 'ENE',
      start: 56.25,
      end: 78.75
    },
    {
      name: 'E',
      start: 78.75,
      end: 101.25
    },
    {
      name: 'ESE',
      start: 101.25,
      end: 123.75
    },
    {
      name: 'SE',
      start: 123.75,
      end: 146.25
    },
    {
      name: 'SSE',
      start: 146.25,
      end: 168.75
    },
    {
      name: 'S',
      start: 168.25,
      end: 191.25
    },
    {
      name: 'SSW',
      start: 191.25,
      end: 213.75
    },
    {
      name: 'SW',
      start: 213.75,
      end: 236.25
    },
    {
      name: 'WSW',
      start: 236.25,
      end: 258.75
    },
    {
      name: 'W',
      start: 258.75,
      end: 281.25
    },
    {
      name: 'WNW',
      start: 281.25,
      end: 303.75
    },
    {
      name: 'NW',
      start: 303.75,
      end: 326.25
    },
    {
      name: 'NNW',
      start: 326.25,
      end: 348.75
    },
    {
      name: 'N',
      start: 348.75,
      end: 360
    }
  ]

  const direction = directionArray.find(el => el.start < deg && deg < el.end )

  return direction.name
}
