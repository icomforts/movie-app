<template>
  <div class="upComingItem" @click.stop="toMovie">
    <img :src="posterImage" />
  </div>
</template>
<script>
export default {
  props: ["data"],
  data() {
    return {};
  },
  computed: {
    rate: function() {
      return this.data.vote_average / 2;
    },
    posterImage: function() {
      return `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${this.data.poster_path}`;
    },
  },
  mounted() {},
  methods: {
    toMovie() {
      this.$router.push({ path: `/movie/${this.data.id}` });
    },
  },
};
</script>
<style lang="scss" scoped>
.upComingItem {
  width: 180px;
  flex: 0 0 auto;
  margin-right: 1rem;
  cursor: pointer;
  transition: transform 0.1s linear;
  &:hover {
    transform: translateY(-0.5rem);
  }
  img {
    border-radius: 16px;
  }
}
</style>
