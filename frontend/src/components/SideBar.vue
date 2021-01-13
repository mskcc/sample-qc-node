<template>
  <div class="sidebar md-layout md-size-50 md-small-size-100">
    <form @submit.prevent="search">
      <md-card class="md-layout-item md-small-size-100">
        <md-card-content>
          <md-field>
            <label>Request ID</label>
            <md-input id="request" v-model="requestId"></md-input>
          </md-field>
        </md-card-content>
        <md-card-actions>
          <md-button type="submit" class="md-primary">Search</md-button>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
export default {
  data: function() {
    return { requestId: '' };
  },
  methods: {
    search() {
      this.$store.commit('setCurrentRequestId', this.requestId);
      this.$store.dispatch('setReports');
    },
  },
};
</script>

<style></style>
