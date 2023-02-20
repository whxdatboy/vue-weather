export interface Coords {
  latitude: number
  longitude: number
}

export interface Direction {
  name: string
  start: number
  end: number
  [key: string]: number | string
}
