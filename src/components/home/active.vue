<!--
 * @Author: your name
 * @Date: 2020-06-05 02:28:40
 * @LastEditTime: 2020-06-08 11:07:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \taoke\src\components\home\active.vue
--> 
<template>
  <div class="active-container">
    <div class="large_activity" v-if="actives.length">
      <div class="max_activity">
        <a href="?r=a/t&amp;i=a850dacecbb116c8&amp;main_activity=1">
          <img :src="actives[0].address" />
        </a>
      </div>
      <ul class="activity_min_group">
        <li class="activity_min">
          <a href="?r=a/t&amp;i=40afabe8fd40903e&amp;main_activity=2">
            <img :src="actives[1].address" />
          </a>
        </li>
        <li class="activity_min">
          <a href="?r=a/t&amp;i=61ff716b24eb8c6c&amp;main_activity=3">
            <img :src="actives[2].address" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getActive } from "api/home";
export default {
  data() {
    return {
      actives: []
    };
  },
  created() {
    this._getActive();
  },
  methods: {
    async _getActive() {
      let res = await getActive();
      if (res.code === 0) {
        this.actives = res.data.config;
        console.log("活动", this.actives);
      } else {
        console.log(res.msg);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.active-container {
  background: cadetblue;
  width: 100%;
  overflow: hidden;
  .large_activity {
    padding: 10px 0;
    .max_activity {
      width: 100%;
      padding: 0 8px;
      box-sizing: border-box;
      img {
        width: 100%;
      }
    }
    .activity_min_group {
      width: 100%;
      overflow: hidden;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      margin-top: 10px;
      li{
        flex-grow: 1;
      }
      img {
        width: 100%;
        border-radius: 5px;
      }
      li:nth-child(1) {
        margin-left: 8px;
        margin-right: 2.5px;
      }
      li:nth-child(2) {
        margin-left: 2.5px;
        margin-right: 8px;
      }
    }
  }
}
</style>