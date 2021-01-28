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
// import { HOME_PAGE_PATH } from './../../config.js';
export default {
  name: 'SideBar',
  data: function() {
    return { requestId: '' };
  },
  methods: {
    search() {
      // axios call to login to get current user's groups? or should this happen when app.vue is mounted? and store the groups in the store?

      this.$store.commit('setCurrentRequestId', this.requestId);
      this.$store.dispatch('setReports');

      history.pushState(this.requestId, '', `http://localhost:8080/${this.requestId}`);
    },
  },
};
</script>

<style></style>
