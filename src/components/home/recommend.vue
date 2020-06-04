<template>
  <div class="recommend-container">幻灯</div>
</template>

<script>
import { getRecommend } from "api/home";
export default {
  data() {
    return {
      recommends: []
    };
  },
  created() {
    this._getRecommend();
  },
  methods: {
    // 幻灯
    // async _getRecommend() {
    //   const url =
    //     "http://cmsjapi.ffquan.cn/api/category/product/model-detail-by-model-id-new?entityId=3&modelId=-1&proModelId=1&source=3&version=v1&tuserId=1&isWechat=0";
    //   let { data: res } = await this.$axios.get(url);
    //   this.recommends = res.data;
    //   console.log("幻灯",res);
    //   console.log(this.recommends);
    // }
    async _getRecommend() {
      let res = await getRecommend();
    //   console.log('幻灯ajax',res);
      if (res.code === 0) {
        this.recommends = res.data.config;
        console.log('幻灯数据',this.recommends);
      }else{
          console.log(res.msg);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.recommend-container{
    background: burlywood;
    height: 140px;
}

</style>