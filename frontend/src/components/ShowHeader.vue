<template>
  <md-toolbar class="md-primary">
    <div>
      <md-avatar>
        <img alt="IGO logo" src="./../assets/igo.png" />
      </md-avatar>
      <span>Sample QC</span>
      <md-button v-for="link in links" :key="link" :to="{ name: link }">{{ link }}</md-button>
    </div>
  </md-toolbar>
</template>

<script>
export default {
  data: function() {
    return { links: ['report', 'pending', 'instructions'] };
  },
};
</script>

<style></style>
