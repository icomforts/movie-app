<template>
  <div class="searchAreaM">
    <router-link class="homeIcon" to="/">
      <span></span>
    </router-link>
    <form class="form" @submit.prevent="searchMovies">
      <Row type="flex" justify="center" align="middle">
        <Col span="5" class="first">
          <div class="item">
            <Input v-model="search" placeholder="電影名稱"></Input>
          </div>
        </Col>
      </Row>
    </form>

    <div class="movies">
      <SearchItem :data="movie" v-for="movie in movies" :key="movie.id" />
    </div>
    <Page
      :total="totalPages"
      size="small"
      :current="parseInt(nowPage)"
      @on-change="pageMovies"
    />
  </div>
</template>
<script>
import * as API from "@/request/request";
import SearchItem from "@/components/SearchItem.vue";

export default {
  props: ["keyword", "page"],
  data() {
    return {
      search: "",
      movies: [],
      totalPages: 0,
      totalResult: 0,
      nowPage: 1,
    };
  },
  components: { SearchItem },
  mounted() {},
  created() {
    this.search = this.keyword;
    this.nowPage = this.page;

    this.findMovies(this.keyword, this.page);
  },
  methods: {
    pageMovies(i) {
      if (this.$route.path !== `/search/${this.keyword}/${i}`) {
        this.$router.push({ path: `/search/${this.keyword}/${i}` });
        this.findMovies(this.keyword, i);
      }
    },
    findMovies(keyword, page) {
      API.searchMovies(keyword, page).then((res) => {
        const sort = res.results.sort(function(a, b) {
          return a.vote_average - b.vote_average;
        });
        this.movies = sort.reverse();
        this.totalPages = res.total_pages;
        this.totalResult = res.total_results;
        console.log(res);
      });
    },
    searchMovies() {
      if (this.search && this.$route.path !== `/search/${this.search}/1`) {
        this.$router.push({ path: `/search/${this.search}/1` });
        this.findMovies(this.search, 1);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.searchAreaM {
  padding: 2rem 0 1rem 0;
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
  justify-content: space-around;
  .homeIcon {
    position: absolute;
    top: 1.5rem;
    left: 2.5rem;
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      display: block;
      width: 25px;
      height: 25px;
      border-top: 4px solid honeydew;
      border-left: 4px solid honeydew;
      transform: rotate(-45deg);
      transition: all ease-in-out 0.1s;
      border-radius: 4px;
      &::after {
        content: "";
        display: block;
        width: 4px;
        border-radius: 4px;
        transform: rotate(-45deg) translate(15px, 4px);
        height: 45px;
        transition: all ease-in-out 0.1s;
        background-color: honeydew;
        left: 0;
        top: 0;
      }
      &:hover {
        border-color: rgb(54, 54, 54);
        &::after {
          background-color: rgb(54, 54, 54);
        }
      }
    }
  }
  .form {
    width: 100%;
  }
  .movies {
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    width: 80%;
    flex: 1;
    // background: red;
  }
}
</style>
