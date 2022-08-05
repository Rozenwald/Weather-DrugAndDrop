type TWidget = {
  city: {
    name: string,
    country: string,
  }
  main: {
    icon: string, // id иконки
    temp: number, // температура
    feelsLike: number, // ощущается как
    description: string, // описание
  }
  wind: {
    speed: string, // скорость
    deg: string, // направление
  }
  pressure: number, // давление
  humidity: string, // влажность
  visibility: string, // Видимость
}

type TWeatherResponse = {
  temp: number,
  speed: string,
  davlenieizmeni: string,
  vlajnost: string,
  xxxx: string,
  visibility: string,
}

type AxiosResponse = {
  temp: number,
  speed: string,
  davlenieizmeni: string,
  vlajnost: string,
  xxxx: string,
  visibility: string,
}

export { TWidget };
