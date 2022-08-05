<template>
  <div class="widget">
    <div class="widget__header">
      <div class="widget_city"> {{data.city.name}}, {{data.city.country}}</div>
      <div class="widget_settings">
        <v-btn></v-btn>
      </div>
    </div>
    <div class="widget__info_main">
      <div class="widget__img">
        <img :src="data.main.icon" alt="img">
      </div>
      <div class="widget__text"> {{data.main.temp}} </div>
      <div class="widget__text"> Feels like{{data.main.feelsLike}}. {{data.main.description}} </div>
    </div>
    <div class="widget__info_optional">
      <div class="row">
        <div class="widget__wind">
          <div> {{data.wind.deg}} </div>
          <div> {{data.wind.speed}} </div>
        </div>
        <div class="widget__text"> {{data.pressure}} </div>
        <div class="widget__text"> {{data.humidity}} </div>
        <div class="widget__text"> {{data.visibility}} </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { TWidget } from '../types/index';

@Component({
  name: 'Widget',
})
export default class App extends Vue {
  @Prop(String) readonly cityId!: string;

  private icon = '';

  private data: TWidget|null = null;

  // watch
  // props
  // data
  // computed (get,set)
  // methods
  private getData() {
    const url = `https://api.openweathermap.org/data/2.5/weather?id=${this.cityId}&appid=${process.env.VUE_APP_API_KEY}&units=metric`;
    axios
      .get(url)
      .then((res) => {
        this.handlerResponse(res);
      })
      .catch((err) => console.log(err));
  }

  private handlerResponse(res:any) {
    console.log('RESPONSE --- ', res);
    this.data = {
      city: {
        name: res.data.name,
        country: res.data.sys.country,
      },
      main: {
        icon: `http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`,
        temp: res.data.main.temp,
        feelsLike: res.data.main.feels_like,
        description: res.data.weather[0].description,
      },
      wind: {
        speed: res.data.wind.speed,
        deg: res.data.wind.deg,
      },
      pressure: res.data.main.pressure,
      humidity: res.data.main.humidity,
      visibility: res.data.visibility,
    };
    console.log(this.data);
  }

  created() {
    this.getData();
  }
}
</script>
<style lang="scss">
  .widget {
    &__header {
      display: flex;
      justify-content: center;
      text-align: center
    }
  }
</style>
