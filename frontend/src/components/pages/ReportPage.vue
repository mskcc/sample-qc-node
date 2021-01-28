<template>
  <span class="content"
    ><side-bar></side-bar>
    <comment-container></comment-container>
    <table-container></table-container
  ></span>
</template>

<script>
import SideBar from './../SideBar.vue';
import CommentContainer from './../CommentContainer.vue';
import TableContainer from './../TableContainer.vue';

export default {
  name: 'ReportPage',
  props: ['request'],
  components: {
    SideBar,
    CommentContainer,
    TableContainer,
  },
  mounted: function() {
    if (this.$route.params.request) {
      // console.log(this.$route.params);
      this.$store.commit('setCurrentRequestId', this.$route.params.request);
      this.$store.dispatch('setReports');
    }
  },
};
</script>

<style></style>
