<template>
  <div id="app">
    <Wrapper/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Wrapper from './components/Wrapper.vue';

@Component({
  components: {
    Wrapper,
  },
})
export default class App extends Vue {
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
