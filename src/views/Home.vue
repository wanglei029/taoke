<template>
  <div class="home-container">
    <my-header></my-header>
    <my-menu></my-menu>
    <div class="main">
      <my-recommend></my-recommend>
      <my-active></my-active>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    MyHeader: () => import("components/home/header"),
    MyMenu: () => import("components/home/menu"),
    MyRecommend: () => import("components/home/recommend"),
    MyActive: () => import("components/home/active")
  }
};
</script>

<style lang="scss" scoped>
.home-container {
  height: 100rem;
  .main {    
    position: relative;
    top: 74px;
  }
}
</style>