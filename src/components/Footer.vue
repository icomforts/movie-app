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
         window.gtag('event', 'Nav Click', {
    'event_category': 'Click',
    'event_label': '網站分析/GA教學',
    'value': '出現喔'
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
