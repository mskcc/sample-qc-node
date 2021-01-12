<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <!-- <HelloWorld /> -->
    <span>
      <show-header></show-header>
      <report-page></report-page>
    </span>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue';
import ShowHeader from './components/ShowHeader.vue';
import ReportPage from './components/pages/ReportPage.vue';

export default {
  name: 'App',
  components: {
    // HelloWorld,
    ShowHeader,
    ReportPage,
  },
};
</script>

<style>
@import './assets/css/style.css';
</style>
