<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <!-- <HelloWorld /> -->
    <span>
      <show-header></show-header>
      <loading :active.sync="isLoading" :can-cancel="true" :on-cancel="onCancel" :is-full-page="fullPage"></loading>
      <router-view></router-view>
    </span>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue';
import ShowHeader from './components/ShowHeader.vue';
// Import component
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'App',
  components: {
    // HelloWorld,
    ShowHeader,
    Loading,
  },
  computed: {
    isLoading: function() {
      return this.$store.getters.getIsLoading;
    },
  },
};
</script>

<style>
@import './assets/css/style.css';
</style>
