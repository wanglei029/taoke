<template>
  <div class="backTop" @click="backTop" v-show="flag_scroll">
    <van-icon name="arrow-up" size="20"/>
  </div>
</template>

<script>
export default {
  name: "backTop",
  data() {
    return {
      flag_scroll: false
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  methods: {
    backTop() {
      document.documentElement.scrollTop = 0;
    },
    handleScroll(env) {
    //   console.log("返回顶部", document.documentElement.scrollTop);
      let scrollTop = document.documentElement.scrollTop;
    //   console.log(scrollTop);
      if (scrollTop > 400) {
        // console.log(scrollTop);
        this.flag_scroll = true;
      } else {
        this.flag_scroll = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
// 定义动画 添加边框阴影 参考 ：https://www.w3school.com.cn/cssref/pr_box-shadow.asp
@keyframes breath {
  0%{box-shadow:  0px 0px 0rem red;}
  100%{box-shadow:  0px 0px .2rem red;}
}
.backTop {
  position: fixed;
  bottom: 2rem;
  right: 0.4rem;
  z-index: 100;
  background: rgba(51,51,51,.8);
  width: .7rem;
  height: .7rem;
  border-radius: 100%;
  text-align: center;
  line-height: .84rem;
  color: #fff;
  zoom: 1;
  // 调用动画
  animation: breath 1s linear 1s infinite both;
}
</style>