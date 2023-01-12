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
    deg: number, // направление
  }
  pressure: number, // давление
  humidity: number, // влажность в процентах
  visibility: string, // Видимость в метрах
}
export { TWidget };
