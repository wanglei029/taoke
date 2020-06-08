<!--
 * @Author: your name
 * @Date: 2020-06-08 12:13:50
 * @LastEditTime: 2020-06-09 02:16:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \taoke\src\components\home\recommendGoodsList.vue
--> 
<template>
  <div class="container-goods-list">
    <van-tabs @click="onClick" sticky offset-top="74">
      <van-tab title="发现">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div class="product-card" v-for="item in goods" :key="item.id">
            <div @click="selectGoods(item)" >
              <img v-lazy="item.pic" />
              <div class="product-des">
                <h3 class="product-title">
                  <span v-if="item.tmall===0" class="iconfont icon-taobao" style="color:#ff4200"></span>
                  <span else="item.tmall===1" class="iconfont icon-tianmao" style="color:#ff104d"></span>
                  {{item.dtitle}}
                </h3>
                <p class="price">
                  <span>券后&nbsp;</span>
                  <span class="iconfont icon-renminbi"></span>
                  <span class="price-num">{{item.jiage}}</span>
                </p>
                <p class="label-box">
                  <span class="label label1" v-if="item.labelTwo">{{item.labelTwo}}</span>
                  <span class="label label2" v-if="item.labelOne">{{item.labelOne}}</span>
                  <span class="juan">
                    <span>劵</span>
                    {{item.quanJine}}元
                  </span>
                </p>
                <p class="salse">
                  <span>已售{{item.xiaoliang | digitalConversion}}</span>
                  <span>{{item.comments}}</span>
                </p>
              </div>
            </div>
          </div>
        </van-list>
        <van-button type="info" @click="loadMore">加载更多</van-button>
      </van-tab>
      <van-tab title="精选">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getRecommendGoods } from "api/home";
import { Toast } from "vant";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      goods: [], //保存服务器返回的数据
      pages: 1, //页码
      pagesize: 40, //页大小
      loading: false,
      finished: false,
      refreshing: false
    };
  },
  filters: {
    digitalConversion: function(num) {
      if (num > 999) {
        let value = num / 10000;
        value = value.toFixed(1);
        return `${value}万`;
      } else {
        return num;
      }
    }
  },
  created() {
    // this._getRecommendGoods();
    this.loadMore();
  },
  methods: {
    selectGoods(goods) {
      this.$router.push({
        /* 编程式导航 */
        path: `/goodsdetail/${goods.id}`
      });
      this.setGoods(goods);
      console.log(goods.dtitle);
    },
    async _getRecommendGoods() {
      let res = await getRecommendGoods();
      if (res.code === 0) {
        this.goods = res.data.list;
      }
      console.log("推荐好货商品列表", this.goods);
    },
    async loadMore() {
      this.pages++;
      let params = {
        pageId: this.pages,
        pageSize: this.pagesize
      };
      let res = await getRecommendGoods(params);
      if (res.code === 0) {
        // 5：接收服务器返回的数据
        /* 利用扩展运算符可以将Set转换成真正意义上的数组。
            let arr = [4, 1, 3, 3, 2, '2'];
            let uniqueArr = [...new Set(arr)];
            console.log(uniqueArr); // [4, 1, 3, 2, "2"]
        */
        // 6：保存list
        this.goods = this.goods.concat(res.data.list);
        // 加载状态结束
        this.loading = false;
      } else {
        console.log("领券直播", "没有更多数据了!");
        this.finished = true;
      }
      console.log("推荐好货商品列表", this.goods);
    },
    onClick(name, title) {
      Toast(title);
    },
    onLoad() {
      console.log("onload");
      this.loadMore();
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    /* 通过扩展运算符的方式调mapMutations 做对象映射 */
    ...mapMutations({
      /* 把mutation的修改， 映射成一个方法名
        对应的是mutation-types.js 中的 SET_GOODS 常量
        做了这层映射以后 在代码中可以通过
        this.setGoods(goods) 将数据goods传进来
        实现数据提交
      */
      setGoods: "SET_GOODS"
    })
  }
};
</script>


<style lang="scss" scoped>
.van-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  background: #c000e8;
  padding: 0.2rem 0.2rem;
  .product-card {
    width: 49%;
    overflow: hidden;
    margin-top: 0.2rem;
    background: #fff;
    border-radius: 0.14rem;
    img {
      width: 100%;
      border-radius: 0.14rem;
    }
    .product-des {
      padding: 0.3rem 0.18rem 0.18rem 0.2rem;
      text-align: left;
      .iconfont {
        padding-right: 0.06rem;
      }
      .product-title {
        font-size: 0.26rem;
        font-weight: 400;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 0.4rem;
        padding-right: 0.2rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        /**
        限制在一个块元素显示的文本的行数。
        -webkit-line-clamp 是一个 不规范的属性（unsupported WebKit property），它没有出现在 CSS 规范草案中。
        为了实现该效果，它需要组合其他外来的WebKit属性。常见结合属性：
        display: -webkit-box; 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。
        -webkit-box-orient 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。
        text-overflow，可以用来多行文本的情况下，用省略号“...”隐藏超出范围的文本 。        
        **/
        margin-bottom: 0.1rem;
      }
      .price {
        font-size: 0.2rem;
        font-weight: 400;
        color: #666;
        margin-bottom: 0.01rem;
        .icon-renminbi {
          font-size: 0.24rem;
          font-weight: 500;
          color: #ff2b22;
          margin-left: 0.01rem;
        }
        .price-num {
          font-size: 0.38rem;
          font-weight: 500;
          color: #ff2b22;
        }
      }
      .label-box {
        margin: 0.04rem 0;
        .label {
          height: 0.24rem;
          border-radius: 0.04rem;
          border: 0.02rem solid;
          font-size: 0.19rem;
          font-weight: 400;
          color: #ff0137;
          padding: 0 0.06rem;
          margin-right: 0.1rem;
          display: inline-block;
          vertical-align: middle;
        }
        .label.label1 {
          border-color: rgba(255, 1, 55, 0.55);
          color: #ff0137;
        }
        .label.label2 {
          border-color: rgba(245, 114, 36, 0.7);
          color: #f57223;
        }
        .juan {
          height: 0.28rem;
          background: linear-gradient(90deg, #ff8873 0, #ff4f4f 100%);
          border-radius: 0.04rem;
          padding: 0 0.1rem 0 0.02rem;
          font-size: 0.19rem;
          font-weight: 400;
          color: #fff;
          line-height: 0.28rem;
          display: inline-block;
          position: relative;
          top: 0;
          z-index: 1;
          zoom: 1;
          vertical-align: middle;
          span {
            background: #fff;
            border-radius: 0.02rem 0 0 0.02rem;
            font-size: 0.2rem;
            color: #fe3a33;
            margin: auto 0.1rem auto 0;
            min-width: 0.24rem;
            max-width: 0.24rem;
            min-height: 0.24rem;
            max-height: 0.24rem;
            display: inline-block;
            line-height: 0.24rem;
            text-align: center;
            vertical-align: middle;
          }
        }
      }
      .salse {
        span {
          font-size: 0.2rem;
          font-weight: 400;
          color: #888;
        }
        span:nth-child(2)::before {
          content: "";
          width: 0.02rem;
          background: #888;
          margin: 0 0.1rem;
          display: inline-block;
          height: 0.16rem;
          position: relative;
          z-index: 1;
          zoom: 1;
          top: 0.02rem;
        }
      }
    }
  }
}
::v-deep .van-list__finished-text {
  padding-left: 40%;
}
</style>