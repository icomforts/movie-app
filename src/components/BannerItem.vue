<template>
  <div class="bannerItem" :class="type" @click.stop="toMovie">
    <div
      class="bg"
      :style="{
        backgroundImage: `url(${bgImage}) `,
      }"
    ></div>
    <div class="container">
      <div class="title">{{ data.title }}</div>
      <div class="info">
        <Rate class="rate" allow-half v-model="rate" disabled />
        <div class="genres">
          <div class="genre" v-for="genre in genres" :key="genre">
            <Tag type="border">
              {{ genre }}
            </Tag>
          </div>
        </div>
      </div>
      <div class="overview">
        <span>
          {{ data.overview }}
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["data", "index"],
  data() {
    return {};
  },
  computed: {
    rate: function() {
      return this.data.vote_average / 2;
    },
    genres: function() {
      const sechma = [
        { id: 28, name: "動作" },
        { id: 12, name: "冒險" },
        { id: 16, name: "動畫" },
        { id: 35, name: "喜劇" },
        { id: 80, name: "犯罪" },
        { id: 99, name: "紀錄" },
        { id: 18, name: "劇情" },
        { id: 10751, name: "家庭" },
        { id: 14, name: "奇幻" },
        { id: 36, name: "歷史" },
        { id: 27, name: "恐怖" },
        { id: 10402, name: "音樂" },
        { id: 9648, name: "懸疑" },
        { id: 10749, name: "愛情" },
        { id: 878, name: "科幻" },
        { id: 10770, name: "電視電影" },
        { id: 53, name: "驚悚" },
        { id: 10752, name: "戰爭" },
        { id: 37, name: "西部" },
      ];
      const genres = [];
      this.data.genre_ids.forEach((id) => {
        genres.push(sechma.find((x) => x.id === id).name);
      });

      return genres;
    },
    bgImage: function() {
      return `https://www.themoviedb.org/t/p/original${this.data.backdrop_path}`;
    },
    type: function() {
      return this.index % 2 == 0 ? "even" : "odd";
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
.bannerItem {
  height: 80vh;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  &.even {
    justify-content: flex-start;
    .container {
      margin-left: 10%;
      .title {
        justify-content: flex-start;
      }
      .info {
        align-items: flex-start;
      }
    }
  }
  &.odd {
    justify-content: flex-end;
    .container {
      margin-right: 10%;
      .title {
        justify-content: flex-end;
      }
      .info {
        align-items: flex-end;
      }
    }
  }
  .bg {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-size: cover !important;
    background-repeat: no-repeat;
    filter: brightness(0.5);
  }
  .container {
    position: absolute;
    z-index: 5;
    width: 50%;
    max-width: 512px;
    color: honeydew;
    display: flex;
    flex-direction: column;
    .title {
      display: flex;
      font-size: 3rem;
      font-weight: bold;
    }
    .info {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;
    }
    .genres {
      display: flex;
    }
    .overview {
      display: flex;
      align-items: center;
      span {
        white-space: pre-line;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
        overflow: hidden;
        font-size: 1rem;
        letter-spacing: 0.12rem;
        text-align: justify;
      }
    }
  }
}
</style>
