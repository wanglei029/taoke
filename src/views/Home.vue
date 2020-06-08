<!--
 * @Author: your name
 * @Date: 2020-06-02 17:38:20
 * @LastEditTime: 2020-06-08 16:33:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \taoke\src\views\Home.vue
--> 
<template>
  <div class="home-container">
    <my-header></my-header>
    <my-menu></my-menu>
    <div class="main">
      <my-recommend></my-recommend>
      <my-active></my-active>
      <my-recommendgoodslist></my-recommendgoodslist>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  components: {
    MyHeader: () => import("components/home/header"),
    MyMenu: () => import("components/home/menu"),
    MyRecommend: () => import("components/home/recommend"),
    MyActive: () => import("components/home/active"),
    MyRecommendgoodslist: () => import("components/home/recommendGoodsList")
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