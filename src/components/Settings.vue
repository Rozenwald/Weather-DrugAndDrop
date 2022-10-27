<template>
  <div class="settings">
    <v-row class="header">
      <div class="header__text"> Settings </div>
      <div class="header__settings">
        <v-btn icon @click="closeSettings()">
          <v-icon dark>
            mdi-close
          </v-icon>
        </v-btn>
      </div>
    </v-row>
    <v-row
      v-for="(item, index) in citys"
      :key="index"
      class="city"
      draggable
      @dragover="dragover($event, item, index)"
      @dragstart="dragStart($event, item, index)"
      @dragend="dragEnd($event)">
        <v-icon
          @focus="allowDrag($event)"
          @mouseover="allowDrag($event)"
          class="city__btn drag-and-drop">
          mdi-menu
        </v-icon>
        <div class="city__text"> {{item}} </div>
      <v-btn
          @click="deleteCity(index)"
        class="city__btn"
        icon>
        <v-icon dark>
          mdi-delete
        </v-icon>
      </v-btn>
    </v-row>

    <div class="input">
      <div class="input__text"> Add Location: </div>
      <v-row>
        <v-text-field class="input__settings"
          @keydown.enter="addCity()"
          v-model="name"
          hide-details
          outlined
          dense>
        </v-text-field>
        <v-btn
          @click="addCity()"
          class="city__btn"
          icon>
          <v-icon dark>
            mdi-keyboard-return
          </v-icon>
        </v-btn>
      </v-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  name: 'Settings',
})
export default class App extends Vue {
  private citys:string[] = [];

  private firstElement: number|undefined;

  private activeElement = {
    name: '',
    index: 0,
  };

  private currentElement = {
    name: '',
    index: 0,
  };

  private allowSwap = false;

  name = '';

  dragStart(evt:DragEvent, name:string, index:number) {
    evt.target.classList.add('selected');
    // eslint-disable-next-line no-param-reassign
    evt.dataTransfer.dropEffect = 'move';
    // eslint-disable-next-line no-param-reassign
    evt.dataTransfer.effectAllowed = 'move';
    this.firstElement = index;
    this.activeElement = {
      name,
      index,
    };
    this.currentElement = {
      name,
      index,
    };
  }

  dragEnd(event:DragEvent) {
    if (this.currentElement.index !== this.firstElement) {
      this.$root.$emit('changeCitys', this.firstElement, this.currentElement.index);
      localStorage.setItem('citys', JSON.stringify(this.citys));
    }
    event.target.classList.remove('selected');
  }

  dragover(evt:DragEvent, name:string, index:number) {
    evt.preventDefault();
    this.currentElement = {
      name,
      index,
    };
    this.allowSwap = ((this.activeElement.name !== this.currentElement.name) && (evt.target.classList.contains('city')));
    if (this.allowSwap) {
      this.citys.splice(this.activeElement.index, 1);
      this.activeElement.index = this.currentElement.index;
      this.citys.splice(this.currentElement.index, 0, this.activeElement.name);
    }
  }

  closeSettings() {
    this.$root.$emit('closeSettings');
  }

  addCity() {
    if (this.name !== '') {
      this.$root.$emit('addCity', this.name);
      this.citys.push(this.name);
      localStorage.setItem('citys', JSON.stringify(this.citys));
    }
  }

  deleteCity(index: number) {
    this.$root.$emit('deleteCity', index);
    this.citys.splice(index, 1);
    localStorage.setItem('citys', JSON.stringify(this.citys));
  }

  created() {
    this.citys = JSON.parse(localStorage.getItem('citys'));
  }
}
</script>
<style lang="scss">
  :root {
    --deg: 180deg;
  }
  .row {
    margin: 0px;
  }
  .drag-and-drop {
    cursor: move
  }
  .selected {
    opacity: 0.4;
  }
  .drop {
    height: 250px;
    background-color: blue;
  }
  .settings {
    width: 350px;
    margin-top: 24px;
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
    .city {
      margin-top: 12px !important;
      margin-bottom: 12px !important;
      justify-content: space-between;
      background-color: #dddddd;
      font-weight: 700;
      &__text {
        display: flex;
        margin-left: 12px;
        margin-top: auto;
        margin-bottom: auto;
      }
      &__btn {
        display: flex;
        margin-top: auto;
        margin-bottom: auto;
        margin-left: 4px;
      }
    }
    .input {
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
