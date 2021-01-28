<template>
  <div class="comment-area">
    <span>
      <span v-for="(comment, index) in reports[currentTab].comments" :key="index">
        <span v-html="comment.comment"></span>
        <span>{{ comment.username }}</span>
      </span>
    </span>
    <form>
      <md-field>
        <label>Textarea</label>
        <md-textarea v-model="textarea"></md-textarea>
      </md-field>
    </form>
  </div>
</template>

<script>
export default {
  computed: {
    reports: function() {
      return this.$store.getters.getReports;
    },
    reportTypes: function() {
      return this.$store.getters.getReportTypes;
    },
    currentTab: function() {
      return this.$store.state.currentReportTab;
    },
  },
};
</script>

<style></style>
