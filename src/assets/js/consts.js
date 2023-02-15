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
  /*const associatedArray = {
    N:
      [
        {
          min:0,
          max:11.25
        },
        {
          min:348.75,
          max:360
        }
      ],
    NNE:[
    
    ]
    }*/
  let direction = ''
  if (deg > 348.75 || 11.25 > deg > 0) direction = 'N'
  else if (33.75 > deg > 11.25) direction = 'NNE'
  else if (56.25 > deg > 33.75) direction = 'NE'
  else if (78.75 > deg > 56.25) direction = 'ENE'
  else if (101.25 > deg > 78.75) direction = 'E'
  else if (123.75 > deg > 101.25) direction = 'ESE'
  else if (146.25 > deg > 123.75) direction = 'SE'
  else if (168.75 > deg > 146.25) direction = 'SSE'
  else if (191.25 > deg > 168.25) direction = 'S'
  else if (213.75 > deg > 191.25) direction = 'SSW'
  else if (236.25 > deg > 213.75) direction = 'SW'
  else if (258.75 > deg > 236.25) direction = 'WSW'
  else if (281.25 > deg > 258.75) direction = 'W'
  else if (303.75 > deg > 281.25) direction = 'WNW'
  else if (326.25 > deg > 303.75) direction = 'NW'
  else direction = 'NNW'
  return direction
}
