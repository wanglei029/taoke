<template>
  <div id="app">
    <my-tab></my-tab>
    <my-back-top></my-back-top>
    <router-view />
  </div>
</template>
<script>
export default {
  components: {
    MyTab: () => import("components/tab/Tab"), //引入底部导航组件
    MyBackTop: () => import("components/backTop/backTop"), //引入返回到顶部
  }
};
</script>
