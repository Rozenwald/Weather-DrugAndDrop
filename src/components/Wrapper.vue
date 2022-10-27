<template>
  <div>
    <component
      v-for="(item, index) in citys"
      :is="(index == 0) ? tab : 'Widget'"
      :name="item"
      :key="item"
      :id="index">
    </component>
  </div>
</template>

<script lang="ts">
//   <Widget>
//   </Widget>
import axios from 'axios';
import { Vue, Component } from 'vue-property-decorator';
import Widget from './Widget.vue';
import Settings from './Settings.vue';

@Component({
  name: 'Wrapper',
  components: {
    Widget,
    Settings,
  },
})

export default class App extends Vue {
  tab = 'Widget';

  private length: number|undefined;

  private citys:string[] = [];

  openSettings() {
    this.tab = 'Settings';
  }

  closeSettings() {
    this.tab = 'Widget';
  }

  addCity(name:string) {
    this.citys.push(name);
  }

  deleteCity(index: number) {
    this.citys.splice(index, 1);
  }

  changeCitys(firstIndex:number, currentIndex:number) {
    const el = this.citys[firstIndex];
    this.citys.splice(firstIndex, 1);
    this.citys.splice(currentIndex, 0, el);
  }

  getFirstCity(position:any) {
    const lat:number = position.coords.latitude;
    const lon:number = position.coords.longitude;
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.name}&appid=${process.env.VUE_APP_API_KEY}`;
    const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&local=RU&appid=${process.env.VUE_APP_API_KEY}`;
    axios
      .get(url)
      .then((res) => {
        console.log('then');
        console.log(res);
        const city = 'Владивосток';
        // const city = res.data[0].local_names.ru;
        this.citys.push(city);
        localStorage.setItem('citys', JSON.stringify(this.citys));
      })
      .catch((err) => {
        console.log('then');
        console.log(err);
      });
  }

  errorHandler(err:any) {
    console.log(err);
  }

  created() {
    if (localStorage.getItem('citys')) {
      this.citys = JSON.parse(localStorage.getItem('citys'));
    } else {
      navigator.geolocation.getCurrentPosition(this.getFirstCity, this.errorHandler);
    }

    this.$root.$on('openSettings', () => this.openSettings());
    this.$root.$on('closeSettings', () => this.closeSettings());
    this.$root.$on('addCity', (name:string) => this.addCity(name));
    this.$root.$on('deleteCity', (index:number) => this.deleteCity(index));
    this.$root.$on('changeCitys', (firstIndex:number, currentIndex:number) => this.changeCitys(firstIndex, currentIndex));
  }
}
</script>

<style>

</style>
