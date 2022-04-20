<template>
  <div id="app">
    <Navbar v-if="check" />
    <router-view />
    <Footer v-if="check" />
    1
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
      const sechma = ["Movie", "Actor", "Movies", "Search"];
      if (sechma.includes(this.$route.name)) {
        this.check = false;
      } else {
        this.check = true;
      }
    },
  },
  created(){
      const sechma = ["Movie", "Actor", "Movies", "Search"];
      if (sechma.includes(this.$route.name)) {
        this.check = false;
      } else {
        this.check = true;
      }
  },
  mounted() {},
};
</script>
<style></style>
