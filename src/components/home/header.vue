<template>
  <div class="container">
    <div class="header" ref="bgColor">
      <div class="left">
        <span class="iconfont">&#xe66d;</span>
        <span>输入商品名称或粘贴宝贝标题搜索</span>
      </div>
      <div class="right">
        <span class="iconfont">&#xe607;</span>
        <span>消息</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
// import event from "@/assets/js/event.js";

export default {
  created() {
    // 绑定自定义事件
    // event.$on("changeColor", color => {
    //   //一些操作，message就是从top组件传过来的值
    //   // console.log("Header中接收Swiper传的颜色", color);
    //   const bgColor = this.$refs.bgColor;
    //   bgColor.style.transition = "all 0.1s";
    //   bgColor.style.backgroundColor = color;
    // });
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/_varibles";
.container {
  .header {
    width: 100%;
    height: 0.88rem;
    overflow: hidden;
    position: fixed;
    top: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    background: $bgColor;
    .left {
      flex: 1;
      height: 0.7rem;
      background: #fff;
      border-radius: 0.4rem;
      margin: 0 0.3rem;
      display: flex;
      align-items: center;
      span:nth-of-type(1) {
        padding: 0 0.17rem 0 0.32rem; //上右下左
      }
    }
    .right {
      display: flex;
      color: #fff;
      flex-direction: column;
      padding-right: 0.2rem;
      span {
        line-height: 0.38rem;
      }
    }
  }
}
</style>