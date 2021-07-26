<template>
  <div class="upComingArea">
    <h2>即將上映</h2>
    <div class="slides">
      <UpComingItem
        :data="movie"
        v-for="movie in upComingMovies"
        :key="movie.id"
      />
    </div>
  </div>
</template>
<script>
import UpComingItem from "@/components/UpComingItem.vue";

export default {
  props: ["upComingMovies"],
  components: {
    UpComingItem,
  },
  computed: {},
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.upComingArea {
  margin-top: 6rem;
  padding: 0 10rem;
  h2 {
    font-size: 2rem;
    letter-spacing: 0.19rem;
    text-align: left;
    margin-bottom: 1rem;
  }
}
</style>
