<template>
  <div id="app">
    <Navbar v-if="check" />
    <router-view />
    <Footer v-if="check" />
  </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      check: false,
    };
  },
  watch: {
    $route() {
      console.log(this.$route.name);
      const sechma = ["Movie", "Actor", "Movies", "Search"];
      if (sechma.includes(this.$route.name)) {
        this.check = false;
      } else {
        this.check = true;
      }
    },
  },
  mounted() {},
};
</script>
<style></style>
