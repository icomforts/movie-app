<template>
  <div class="footer">
    <span id="footerLine" @click="alert('測試GTM')">僅作為DEMO使用123</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      
    };
  },
  methods: {
    alert(msg) {
      alert(msg);
         window.gtag('event', 'click footerLine', {
    'event_category': 'Click',
    'event_label': '網站分析/GA教學',
    });
    },
  },

}
</script>
<style lang="scss">
.footer {
  background: #090a0e;
  padding: 2rem 0;
  margin-top: 5rem;
}
</style>
