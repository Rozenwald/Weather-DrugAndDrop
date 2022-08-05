<template>
  <widget cityId="2013348" class="widget"/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Widget from './Widget.vue';

@Component({
  name: 'Wrapper',
  components: {
    Widget,
  },
})

export default class App extends Vue {
  private city:string[] = [];
}
</script>

<style>

</style>
