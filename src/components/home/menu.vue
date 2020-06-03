<template>
  <div class="horizontal-container">
    <div class="scroll-wrapper" ref="scroll">
      <div class="scroll-content">
        <div class="scroll-item" v-for="(item, index) in menuList" :key="index">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import BScroll from "@better-scroll/core";

export default {
  data() {
    return {
      menuList: []
    };
  },
  watch: {
    menuList() {
      console.log("watch", this.menuList);
      this.$nextTick(() => {
        //此时就可以获取到在created赋值后的menuList了 不用考虑设置多长时间合适
        this.bs.refresh();
        console.log("重新计算最新的滚动距离");
      });
      // setTimeout(() => {
      //   console.log("mounted() muneList.length", this.menuList.length);
      //   this.bs.refresh();
      //   console.log("watck-10毫秒后刷新");
      // }, 1);
    }
  },
  created() {
    this.getMenu();
  },
  mounted() {
    this.init();
    // setTimeout(() => {
    //   console.log("mounted() muneList.length",this.menuList.length);
    //   this.bs.refresh();
    //   console.log("10毫秒后刷新");
    // }, 20);
    this.$nextTick(function() {
      // console.log("DOM变化渲染完成");
      console.log("mounted() muneList.length", this.menuList.length);
      // this.bs.refresh();
      // setTimeout(() => {
      //   this.bs.refresh();
      //   console.log("30毫秒后刷新");
      //   /****浏览器通常会17毫秒刷新一次
      //    * 设置为setTimeout10毫秒或者小于17毫秒，其实都不会在这个时间去刷新
      //    * 至少也是在17毫秒之后，所以采用20毫秒，是一个比较科学的值
      //    * 20 ms 是一个经验值，每一个 Tick 约为 17 ms），
      //    * 对用户体验而言都是无感知的。
      //    * ****/
      // }, 60);
    });
  },
  /*******
   * 问题：
   *
   * *********/

  beforeDestroy() {
    this.bs.destroy();
  },
  methods: {
    // 超级分类
    async getMenu() {
      // 通过async和await简化promise操作
      // {data：res}解构赋值
      // let { data: res } = await this.$axios.get("getsupercategory");
      const url = "http://cmsjapi.ffquan.cn/api/category/get-category-list";
      let { data: res } = await this.$axios.get(url);
      this.menuList = res.data;
      console.log(this.menuList);
    },
    init() {
      this.bs = new BScroll(this.$refs.scroll, {
        scrollX: true,
        probeType: 3 // listening scroll hook
      });
      console.log(this.bs);
    }
  }
};
</script>
<style lang="scss" scoped>
.horizontal-container {
  .scroll-wrapper {
    width: 100%;
    height: 0.8rem;
    white-space: nowrap;
    overflow: hidden;
    // color: #fff;
    background: chartreuse;

    .scroll-content {
      display: inline-block;
    }

    .scroll-item {
      height: 0.8rem;
      line-height: 0.8rem;
      font-size: 14px;
      display: inline-block;
      text-align: center;
      padding: 0 0.16rem;
    }
  }
}
</style>