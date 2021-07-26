<template>
  <div class="movie" v-if="movieDetails">
    <div
      class="backdrop"
      :style="{
        backgroundImage: `url(https://www.themoviedb.org/t/p/original${movieDetails.backdrop_path}) `,
      }"
    ></div>
    <router-link class="homeIcon" to="/">
      <span></span>
    </router-link>

    <div class="info">
      <div class="title">
        {{ movieDetails.title }}
      </div>
      <div class="rate">
        <Rate allow-half v-model="rate" disabled />
        <span>
          {{ rate }}
        </span>
      </div>
      <a
        :href="movieDetails.homepage"
        target="_blank"
        rel="noopener noreferrer"
        class="button"
      >
        立即觀賞
      </a>
      <div class="photos">
        <img
          v-for="image in images"
          :key="image.file_path"
          :src="
            `https://www.themoviedb.org/t/p/w533_and_h300_bestv2${image.file_path}`
          "
        />
      </div>
    </div>
    <div class="introduction">
      <div class="pic">
        <div
          class="img"
          :style="{
            backgroundImage: `url(${posterImage}) `,
          }"
        ></div>
      </div>
      <div class="rate">
        <Rate allow-half v-model="rate" disabled />
        <span>
          {{ rate }}
        </span>
      </div>
      <hr />
      <div class="overview">
        <span>
          {{ movieDetails.overview }}
        </span>
      </div>
      <div class="casts">
        <div class="cast" v-for="cast in casts" :key="cast.id">
          <div class="avatar" @click="toActor(cast.id)">
            <Avatar
              v-if="cast.profile_path"
              :src="
                `https://www.themoviedb.org/t/p/w138_and_h175_face${cast.profile_path}`
              "
            >
            </Avatar>
            <Avatar v-else />
          </div>
          <span>
            {{ cast.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as API from "@/request/request";
export default {
  props: ["id"],
  data() {
    return {
      movieDetails: {},
      casts: [],
      value1: 0,
      images: [],
    };
  },
  components: {},
  created() {
    API.getMovieDetails(this.id).then((res) => {
      this.movieDetails = res;
      console.log(res);
    });
    API.getMovieActors(this.id).then((res) => {
      const sort = res.cast.sort(function(a, b) {
        return a.order - b.order;
      });
      this.casts = sort.splice(0, 6);
      console.log(sort);
    });
    API.getMovieImages(this.id).then((res) => {
      this.images = res.backdrops.splice(0, 3);
      console.log(res.backdrops);
    });
  },
  computed: {
    rate: function() {
      return this.movieDetails.vote_average / 2;
    },

    bgImage: function() {
      return `https://www.themoviedb.org/t/p/original${this.movieDetails.backdrop_path}`;
    },
    posterImage: function() {
      return `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${this.movieDetails.poster_path}`;
    },
  },
  methods: {
    toActor(actorId) {
      this.$router.push({ path: `/actor/${actorId}` });
    },
    test() {
      console.log("s");
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.movie {
  position: relative;
  flex-grow: 1;
  color: honeydew;
  .homeIcon {
    position: absolute;
    top: 1.5rem;
    left: 2.5rem;
    z-index: 5;
    // background: red;
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
  .backdrop {
    background-position: 50% 25%;
    position: absolute;
    background-size: cover;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    filter: brightness(0.6);
  }
  .info {
    position: absolute;
    width: 60%;
    display: flex;
    flex-direction: column;
    z-index: 2;
    height: 50%;
    padding: 2rem;
    align-items: flex-start;
    height: 100%;
    justify-content: flex-end;
    .title {
      font-size: 2.75rem;
      text-align: left;
    }
    .rate {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      span {
        font-size: 1.2rem;
      }
    }
    .button {
      margin: 1rem 0 2rem 0;
      border: solid 2px honeydew;
      padding: 0.75rem 1.5rem;
      border-radius: 50vh;
      width: fit-content;
      transition: all 0.2s ease-in-out;
      font-weight: bolder;
      color: honeydew;
      letter-spacing: 0.1rem;
      &:hover {
        background: honeydew;
        color: #2c3e50;
        cursor: pointer;
      }
    }
    .photos {
      padding-top: 1rem;
      display: flex;
      width: 100%;
      justify-content: space-between;
      img {
        width: 30%;
        border-radius: 16px;
        transition: transform 0.1s linear;
        &:hover {
          transform: scale(1.02);
        }
      }
    }
  }
  .introduction {
    position: absolute;
    right: 0;
    width: 40%;
    height: 100%;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    padding: 1rem 0;
    > div {
      width: 80%;
    }
    .pic {
      width: 33%;
      height: auto;
      aspect-ratio: 3/4;
      position: relative;
      .img {
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        border-radius: 8px;
      }
    }
    .rate {
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        font-size: 1.2rem;
      }
    }
    &::before {
      content: "";
      filter: blur(1px);
      background: hsla(0, 1%, 37%, 0.767);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
    }
    hr {
      width: 80%;
    }
    .overview {
      text-align: justify;
      font-size: 1rem;
      letter-spacing: 0.1rem;
      white-space: pre-line;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 10;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .casts {
      display: grid;
      grid-template-rows: repeat(1fr, 2);
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      .cast {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        span {
          margin-top: 0.5rem;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.ivu-avatar {
  width: 60px;
  height: 60px;
}
.ivu-avatar > img {
  object-fit: cover;
  border: 2px solid honeydew;
  border-radius: 100vh;
  cursor: pointer;
  transition: transform 0.1s linear;

  &:hover {
    border: unset;
    transform: scale(1.05);
  }
}
</style>
