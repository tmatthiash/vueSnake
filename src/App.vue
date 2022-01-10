<template>
  <img alt="Vue logo" src="./assets/snake.png" />
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <home-page
    :key="componentKey"
    v-on:reset="handleSpaceBar()"
    v-on:collide="restartAvailable = true"
  />
  <button v-if="restartAvailable" class="reset-button" @click="forceRender()">
    RESET (Space Bar)
  </button>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import HomePage from "./components/HomePage.vue";
import { clearAllClasses } from "./utils/ClearAllClasses";

export default {
  name: "App",
  components: {
    HomePage,
  },
  data() {
    return {
      componentKey: 0,
      restartAvailable: false,
    };
  },
  methods: {
    forceRender() {
      this.restartAvailable = false;
      this.componentKey += 1;
      clearAllClasses();
    },
    handleSpaceBar() {
      if (this.restartAvailable) this.forceRender();
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.reset-button {
  margin-top: 20px;
  background-color: white;
  border: 2px solid purple;
  height: 30px;
  width: 175px;
  font-weight: bold;
  color: purple;
  border-radius: 8px;
}
</style>
