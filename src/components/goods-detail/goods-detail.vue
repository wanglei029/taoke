<!--
 * @Author: your name
 * @Date: 2020-06-08 10:32:29
 * @LastEditTime: 2020-06-09 02:18:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \taoke\src\components\goods-detail\goods-detail.vue
--> 
<template>
  <div class="goods-container">商品详情页{{id}}</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters([
      "goods" //对应的是store/getters 中的goods
    ])
  },
  data() {
    return {
      id: {
        type: Number,
        default: 0
      }
    };
  },
  created() {
    console.log("state中的goods", this.goods.dtitle);
  },
  mounted() {
    console.log(this.id);
    this.id = this.$route.params.id;
  },
  watch: {
    $route() {
      this.id = this.$route.params.id;
    }
  }
};
</script>

<style lang="scss" scoped>
.goods-container {
  height: 100%;
  background: brown;
}
</style>