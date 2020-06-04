<template>
  <div class="container">
    <my-header></my-header>
    <my-menu></my-menu>
  </div>
</template>

<script>
export default {
  components: {
    MyHeader: () => import("components/home/header"),
    MyMenu: () => import("components/home/menu")
  }
};
</script>

<style lang="scss" scoped>
.container {
  height: 100rem;
}
</style>