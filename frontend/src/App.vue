<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <!-- <HelloWorld /> -->
    <span>
      <show-header></show-header>
      <router-view></router-view>
    </span>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue';
import ShowHeader from './components/ShowHeader.vue';

export default {
  name: 'App',
  components: {
    // HelloWorld,
    ShowHeader,
  },
};
</script>

<style>
@import './assets/css/style.css';
</style>
