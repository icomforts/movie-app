<template>
  <div class="home">
    <Banner :bannerMovies="bannerMovies" />
    <Search />
    <Popular :popularMovies="popularMovies" />
    <UpComing :upComingMovies="upComingMovies" />
  </div>
</template>

<script>
// @ is an alias to /src
import Banner from "@/components/Banner.vue";
import Popular from "@/components/Popular.vue";
import Search from "@/components/Search.vue";

import UpComing from "@/components/UpComing.vue";

import * as API from "@/request/request";
export default {
  name: "Home",
  components: {
    Banner,
    Popular,
    Search,
    UpComing,
  },
  data() {
    return {
      popularMovies: {},
      upComingMovies: {},
      bannerMovies: [],
    };
  },
  mounted() {
    API.getPopular()
      .then((res) => {
        this.popularMovies = res.results;
        this.bannerMovies = res.results.splice(0, 5);
      })
      .catch((err) => {
        console.log(err);
      });
    API.getUpComing()
      .then((res) => {
        this.upComingMovies = res.results;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
