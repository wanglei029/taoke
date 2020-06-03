<template>
  <div class="container">
    首页
    <my-menu></my-menu>
  </div>
</template>

<script>
export default {
  components: {
    MyMenu: () => import("components/home/menu")
  }
};
</script>

<style lang="scss" scoped>
.container {
  height: 100rem;
}
</style>