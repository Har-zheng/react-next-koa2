# react next koa2 开发全栈Github项目
- 安装的几种方式
- 手动
- yarn create
- create-next-app my-app
+ 使用koa 中间件的使用 next
+ ui库使用ant design
+ 路由映射表
+ 路由变化的钩子
```javascript
  路由钩子
  路由钩子指的是在next中进行路由跳转时，执行的函数。分别是：
  routeChangeStart：开始跳转时触发。
  routeChangeComplete：跳转完成之后触发。
  routeChangeError：跳转到一个不存在的路径触发。
  beforeHistoryChange：启用history路由，在跳转成功前触发。
  hashChangeStart：启用hash路由时，在开始跳转时触发
  hashChangeComplete：启用hash路由时，在跳转成功后触发。
```
+ nextjs数据获取方式
1 在页面中获取数据
2 在app中获取数据
+ nextjs 自定义app
1 固定Layout 
2 保持一些公用的状态
3 给页面传入一些自定义数据
4 自定义错误处理
+ next.js 自定义Document
1 只有在服务端渲染的时候才会被调用
2 用来修改服务端渲染的文档内容
3 一般来配合第三方scc-in-js方案的使用
+ nextjs 样式的自定义
+ nextjs 集成styled-components
> 安装 cnpm i styled-components babel-plugin-styled-components
+ nextjs中异步加载模块和组件的加载
+ next.config.js 配置文件