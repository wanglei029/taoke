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
新建 package.config.js
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
```