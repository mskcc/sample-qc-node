<template>
  <div class="sidebar">
    <form @submit.prevent="search">
      <md-card>
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
  name: 'SideBar',
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
