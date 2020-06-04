import axios from "axios"
import { commonParams } from './config'

export function getMenu() {
    const url = "http://cmsjapi.ffquan.cn/api/category/get-category-list";
    return axios.get(url).then((res) => {
        return Promise.resolve(res.data)
    })
}
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

export function getDiscList() {
    const url = '/api/getDiscList'

    const data = Object.assign({}, commonParams, {
        platform: 'yqq',
        hostUin: 0,
        sin: 0,
        ein: 29,
        sortId: 5,
        needNewCode: 0,
        categoryId: 10000000,
        rnd: Math.random(),
        format: 'json'
    })

    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}