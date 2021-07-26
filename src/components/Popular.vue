<template>
  <div class="popularArea">
    <h2>熱門電影</h2>
    <div class="slides">
      <PopularItem
        :data="movie"
        v-for="movie in popularMovies"
        :key="movie.id"
      />
    </div>
  </div>
</template>
<script>
import PopularItem from "@/components/PopularItem.vue";

export default {
  props: ["popularMovies"],
  components: {
    PopularItem,
  },
  computed: {},
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.popularArea {
  margin-top: 10rem;
  padding: 0 10rem;
  h2 {
    font-size: 2rem;
    letter-spacing: 0.19rem;
    text-align: left;
    margin-bottom: 1rem;
  }
}
</style>
