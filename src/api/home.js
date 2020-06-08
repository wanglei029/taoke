/*
 * @Author: your name
 * @Date: 2020-06-03 10:53:39
 * @LastEditTime: 2020-06-08 17:41:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \taoke\src\api\home.js
 */ 
import axios from "axios"
import { commonParams } from './config'

export function getMenu() {
    const url = "http://cmsjapi.ffquan.cn/api/category/get-category-list";
    return axios.get(url).then((res) => {
        return Promise.resolve(res.data)
    })
}
/* 幻灯片 */
export function getRecommend() {
    const url = "http://cmsjapi.ffquan.cn/api/category/product/model-detail-by-model-id-new";
    const data = Object.assign({}, commonParams, {
        // entityId: 3,
        modelId: -1,
        proModelId: 1,
        source: 3,
        version: 'v1',
        tuserId: 1,
        isWechat: 0
    })
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}
/* 活动 */
export function getActive() {
    const url = "http://cmsjapi.ffquan.cn/api/category/product/model-detail-by-model-id-new";
    const data = Object.assign({}, commonParams, {
        // entityId: 3,
        modelId: 18784,
        proModelId: 19,
        source: 3,
        version: 'v1',
        tuserId: 1,
        isWechat: 0
    })
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}
/* 发现推荐好货 商品列表 */
export function getRecommendGoods(params) {
    const url = "http://cmsjapi.ffquan.cn/api/category/index/lingquan-live-new";
    const data = Object.assign({}, commonParams, {
        pageId: 1,
        pageSize: 10,
        entityId: 4,
        type: 1,
        version: 'v1',
        tuserId: 1206917,
        isWechat: 0
    },params)
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}
