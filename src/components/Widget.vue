<template>
  <div class="widget">

    <v-skeleton-loader
      v-bind="{class: 'mb-6'}"
      v-show="loading"
      max-width="350"
      type="heading, list-item-avatar, text, text, text ">
    </v-skeleton-loader>

    <div v-if="!loading && data">
      <v-row class="header">
        <div class="header__text"> {{data?.city.name}}, {{data?.city.country}}</div>
        <div v-if="id == 0" class="header__settings">
          <v-btn @click="openSettings()" icon>
            <v-icon dark>
              mdi-cog
            </v-icon>
          </v-btn>
        </div>
      </v-row>

      <v-row class="main">
        <div class="main__img">
          <img :src="data?.main.icon" alt="img">
        </div>
        <div class="main__temp"> {{data?.main.temp}}°C </div>
        <div class="main__text">
          Feels like {{data?.main.feelsLike}}°C. {{data?.main.description}}
        </div>
      </v-row>

      <div class="info">
        <div class="info__wrapper">
          <div class="icon-wrapper">
            <v-icon class="icon-wrapper__icon_wind" color="red"> mdi-navigation </v-icon>
            <div class="info__text"> {{data?.wind.speed}}m/s </div>
          </div>
          <div class="info__text"> Humidity: {{data?.humidity}}% </div>
        </div>
        <div class="info__wrapper">
          <div class="icon-wrapper">
            <v-icon class="icon-wrapper__icon" color="red"> mdi-gauge </v-icon>
            <div class="info__text"> {{data?.pressure}}hPa </div>
          </div>
          <div class="info__text"> Visibility: {{data?.visibility}}km </div>
        </div>
      </div>
    </div>
    <div v-if="!data && !loading">
      Данные на город "{{name}}" отсутствуют
    </div>
  </div>
</template>

<script lang="ts">
import axios, { AxiosResponse } from 'axios';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { TWidget } from '../types/index';

@Component({
  name: 'Widget',
})
export default class Widget extends Vue {
  @Prop(String) readonly name!: string;

  @Prop(Number) readonly id!: number;

  data: TWidget|null = null;

  loading = true;

  private getData() {
    this.loading = true;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.name}&units=metric&appid=${process.env.VUE_APP_API_KEY}`;
    axios
      .get(url)
      .then((res) => {
        this.handlerResponse(res);
      })
      .catch((err) => {
        console.log('catch');
        console.log(err);
        this.loading = false;
      });
  }

  private handlerResponse(res: AxiosResponse) {
    console.log(res);
    const text = res.data.weather[0].description;
    const description: string = text[0].toUpperCase() + text.slice(1, text.length);
    this.data = {
      city: {
        name: res.data.name,
        country: res.data.sys.country,
      },
      main: {
        icon: `http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`,
        temp: Math.round(res.data.main.temp),
        feelsLike: Math.round(res.data.main.feels_like),
        description,
      },
      wind: {
        speed: res.data.wind.speed.toFixed(1),
        deg: res.data.wind.deg,
      },
      pressure: res.data.main.pressure,
      humidity: res.data.main.humidity,
      visibility: (res.data.visibility / 1000).toFixed(1),
    };
    const root = document.querySelector(':root') as HTMLElement;
    root?.style.setProperty('--deg', `${this.data.wind.deg + 180}deg`);
    this.loading = false;
  }

  openSettings() {
    this.$root.$emit('openSettings');
  }

  created() {
    this.getData();
  }
}
</script>
<style lang="scss">
  :root {
    --deg: 180deg;
  }
  .row {
    margin: 0px !important;
  }
  .error {
    width: 350px;
    margin-top: 24px;
    margin-bottom: 24px;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid #474a51;
    border-radius: 8px;
    padding: 12px;
  }
  .widget {
    width: 350px;
    margin-top: 24px;
    margin-bottom: 24px;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid #474a51;
    border-radius: 8px;
    padding: 12px;
    .header {
      justify-content: space-between;
      text-align: center;
      &__text {
        display: flex;
        justify-content: center;
        margin-top: auto;
        margin-bottom: auto;
        font-weight: 700;
      }
    }
    .main {
      padding-top: 12px;
      font-weight: 700;
      &__text {
        display: flex;
      }
      &__temp {
        text-align: start;
        font-size: 2em;
        margin-top: auto;
        margin-bottom: auto;
      }
    }
    .info {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      padding-top: 12px;
      &__wrapper {
        &_left{
          margin-right: 12px;
        }
        &_right{
          margin-left: 12px;
        }
      }
      &__text {
        display: flex;
        font-weight: 700;
        text-align: start;
        margin-top: 8px;
        margin-bottom: 8px;
        &_main{
        }
        &_optional{
          font-weight: 550;
        }
      }
    }
    .icon-wrapper {
      display: flex;
      &__icon {
        margin-right: 5px;
      }
      &__icon_wind {
        margin-right: 5px;
        transform: rotate( var(--deg));
      }
      &__text {
        margin-bottom: auto;
        margin-top: auto;
      }
    }
  }
</style>
