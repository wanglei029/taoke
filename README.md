# taoke

### 初始化开发环境

``` 
1.安装sass
npm i --save-dev sass-loader node-sass
2.手机端300毫秒延迟
npm i fastclick --save

3. axios

npm i axios --save
4.jsonP
npm i jsonp --save
5.为目录配置别名
新建 vue.config.js
6.重置css默认样式
在main.js中引入
//引入reset.css
import "./assets/style/reset.css" 
import "./assets/style/border.css" 

7.安装vant
npm i vant --save-dev
//引入vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
8.引入字体样式库
import "./assets/taoke-icon-font/iconfont.css"
```

### 开发首页中的menu 分支3-menu

``` 
/*****
    注意 当父容器设置 position: fixed; 的时候 横向滚动会失效
    必须同时设置width:100%;box-sizing: border-box;
    
    子容器 .scroll-wrapper 要设置width:100%
*******/ 

menu的难点主要在于实现列表的横向滚动 采用better-scroll 来实现横向滚动
遇到的问题：列表不滚动，有两个可能  
    1.需要滚动的scroll-content 宽度不够
    任何时候如果出现无法滚动的情况，都应该首先查看 content 元素高度/宽度是否大于 wrapper 的高度/宽度。这是内容能够滚动的前提条件。

    2.如果内容存在图片的情况，可能会出现 DOM 元素渲染时图片还未下载，因此内容元素的高度小于预期，出现滚动不正常的情况。此时你应该在图片加载完成后，比如 onload 事件回调中，调用 bs.refresh 方法，它会重新计算最新的滚动距离。

在开发menu.vue组件的时候就是遇到了第二种情况
    menu的数据是通过ajax异步请求的，数据请求回来再渲染到页面需要时间
    但是在 mounted() 钩子函数中 调用 bs.refresh 方法，重新计算最新的滚动距离的时候出现了问题
    当延迟时间设置为20毫秒 有时可以滚动 有时不能滚动

    能滚动的时候   ajax请求中的console.log(this.menuList);先输出，
        而this.$nextTick中  console.log("30毫秒后刷新");后输出

    不能滚动的时候 console.log("30毫秒后刷新");先输出了 而ajax请求中的console.log(this.menuList);还没输出

第一种方案：
    解决办法，在mounted()中调用this.bs.refresh();  将延迟设置的长一些比如 60毫秒 
    此时created()钩子函数中的ajax可能已经获取到数据了

    ！！！！！！！！但是，不明白,  不能滚动的时候 this.$nextTick中  console.log("30毫秒后刷新");为什么会先输出
    猜测可能在created中发送的ajax请求还没返回数据时，mounted就已经执行了此时 this.menuList.length为0

    this.$nextTick(function() {
      setTimeout(() => {
        this.bs.refresh();
        console.log("30毫秒后刷新");
      }, 60);
    });
        /****浏览器通常会17毫秒刷新一次
         * 设置为setTimeout10毫秒或者小于17毫秒，其实都不会在这个时间去刷新
         * 至少也是在17毫秒之后，所以采用20毫秒，是一个比较科学的值
         * 20 ms 是一个经验值，每一个 Tick 约为 17 ms），
         * 对用户体验而言都是无感知的。
         * ****/
问题分析：
因为异步加载需要时间，如果延迟时间是可以获取到数据的，但是问题是不知道需要延迟多久，况且这个方法也不是很好。

第二种方案
    使用watch方法的数据监听 在监听方法中设置延迟调用this.bs.refresh()
    watch: {
        menuList() {
        console.log("watch", this.menuList);
        setTimeout(() => {
            console.log("mounted() muneList.length", this.menuList.length);//已经获取到了menuList的数据
            this.bs.refresh();
            console.log("watck-10毫秒后刷新");
        }, 1);
        }
  },
+++++++++++++++++++++++++++++++++++
vue在created钩子函数请求异步数据，在mounted钩子获取不到？

异步数据问题
1.created、mounted的定义
1.1 created
1.2 mounted
2.问题现象及解决办法
1.created、mounted的定义
1.1 created
附一个官方对于created的定义 ： 【created】

在示例创建完成后被立即调！

在这一步，实例已完成以下的配置：

数据观测 (data observer)，
property 和方法的运算，
watch/event 事件回调。
然而，挂载阶段还没开始，$el property 目前尚不可用。
注意：

在此生命周期内，data、methods、$el均不存在

1.2 mounted
附一个官方对于mounted的定义 ：【mounted】

实例被挂载后调用！

此时的el被新创建的vm.$el替换了。此时可操作一切操作，包括DOM操作。

注意 ：
mounted 不会保证所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以在 mounted 内部使用 vm.$nextTick：

mounted: function () {
this.$nextTick(function () {
	  // Code that will run only after the
	 // entire view has been rendered
  })
}

2.问题现象及解决办法
使用vue时需要加载初始化数据

问题描述：
1.在created生命周期内进行异步数据的请求，且将获取到的数据赋值给this.data。
2.此时如果在mounted生命周期里获取this.data是获取不到的。

问题分析：
因为异步加载需要时间，如果延迟时间是可以获取到数据的，但是问题是不知道需要延迟多久，况且这个方法也不是很好。

那么有没有一个比较优雅的办法进行获取这个异步加载的数据呢

解决办法：
在data里进行数据的定义

data(){
	dataList:''
}

使用watch方法的数据监听

	watch:{
		dataList(){
			this.$nextTick(()=>{
				//此时就可以获取到在created赋值后的dataList了
			})
		}
	}

至此，遇到的问题就以解决~~~
————————————————
版权声明：本文为CSDN博主「Dark_programmer」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/Dark_programmer/java/article/details/106242354
```

### 开发首页 active

``` 
1.抽离了axios请求 axios请求封装到了api/home 中
2.  
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

3.数据要渲染的DOM结构是不同的，因此不能使用v-for循环渲染数据
  采用的是actives[0].address 这样的方式来加载数据
  这样只适用于少量的数据和不复杂的DOM
  若是数组中的前2条数据单独渲染成独特的DOM结构，后面几十条数据渲染的DOM结构相同，需要先加工数组数据，截取数组的一部分进行渲染
```
