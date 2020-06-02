<template>
  <div id="app">
    <div id="nav">
      <tab></tab>
      <back-top></back-top>
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  components:{
    Tab:()=>import('components/tab/Tab') ,//引入顶部导航组件
    BackTop:()=>import('components/backTop/backTop') //引入返回到顶部
  }
}
</script>
