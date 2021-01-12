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
  components: {
    SideBar,
    CommentContainer,
    TableContainer,
  },
};
</script>

<style></style>
