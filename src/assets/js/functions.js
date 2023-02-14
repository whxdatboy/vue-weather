export const anyFunc = (text) => {
  console.log(text)
}

export const getWeatherInfo = async (url) => {
  const response = await fetch(url)
  return await response.json()
}