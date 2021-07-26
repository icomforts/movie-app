<template>
  <div class="banner">
    <Carousel v-model="num" :autoplay-speed="5000" autoplay>
      <CarouselItem v-for="(movie, i) in bannerMovies" :key="i">
        <BannerItem :data="movie" :index="i" />
      </CarouselItem>
    </Carousel>
  </div>
</template>
<script>
import BannerItem from "@/components/BannerItem.vue";

export default {
  props: ["bannerMovies"],
  components: {
    BannerItem,
  },
  data() {
    return {
      num: 0,
    };
  },
  methods: {},
};
</script>
