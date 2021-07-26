<template>
  <div id="nav">
    <router-link to="/">
      <h1>
        Movies
      </h1>
      <img src="../assets/logo.png" alt="movie" width="30" height="30" />
    </router-link>
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> | -->
  </div>
</template>
<style lang="scss">
#nav {
  padding: 10px 0 0 30px;
  width: 100%;
  z-index: 99;
  position: absolute;
  display: flex;
  justify-content: flex-start;
  > a {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    color: #babac0;
    img {
      margin-left: 1rem;
      width: 30px;
      height: 30px;
    }
  }
}
</style>
