export interface IWeather {
  city?: string
  country?: string
  temp?: number
  feels_like?: number
  pressure?: number
  main?: string
  description?: string
  speed?: number
  deg?: number
  direction?: string
  icon?: string
  humidity?: string
  visibility?: string
  [key: string]: string | number | undefined
}
