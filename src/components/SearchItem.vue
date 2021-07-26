<template>
  <div class="searchItem" @click.stop="toMovie">
    <img :src="posterImage" v-if="posterImage" />
    <img v-else src="https://picsum.photos/200/300" />

    <div class="info">
      <div class="rate">
        <Rate class="rate" allow-half v-model="rate" disabled />
      </div>
      <div class="title">
        {{ data.title }}
      </div>
    </div>
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
      if (this.data.poster_path || this.data.backdrop_path)
        return `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${this.data
          .poster_path || this.data.backdrop_path}`;
      return false;
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
.searchItem {
  flex-basis: 12.5%;
  margin-top: 0.625rem;
  max-width: 12.5%;
  padding: 1rem;
  cursor: pointer;
  transition: transform 0.1s linear;
  overflow: hidden;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  .info {
    position: relative;
    padding: 0 0 1rem 0;
    display: flex;
    flex-direction: column;
    > div {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .title {
      font-size: 1rem;
    }
  }
  &:hover {
    transform: translateY(-0.5rem);
  }
}
</style>
