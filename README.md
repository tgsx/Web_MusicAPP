# 仿网易云WebApp
这个项目是我自己用vue全家桶将网易云的部分功能给实现了一遍，已实现的有：歌单推荐，歌单分类选择，歌手/歌曲/专辑的搜索，音乐的播放，歌词同步，切换歌曲等，后续功能会逐渐迭代下去，具体效果大家剋参照网易云音乐APP。

## 技术栈
  本项目所用技术栈：`vue-cli+vuex+vue-router+VueAwesomeSwiper`,其实也就是vue全家桶。采用的是前后端分离的写法，一个页面通常用组件的方式单独存放，同时可重用的部分会分割出来，这部分目前做的不是很好，导致很多冗余代码，后面会想办法改进。歌曲的资源获取会受到`ajax同源策略`的限制，所以用的是github上一位大牛提供的[music api](https://github.com/Binaryify/NeteaseCloudMusicApi "")，原理是用csrf跨域请求伪造和伪造请求头,调用官方 API，有兴趣的可以去观摩观摩。

要想把项目运行起来，大家还需要git clone上面这位大佬的代码，在本地用node跑起来，其实也就是我们整个项目的后端，然后我们前端的工作就是拿到这些数据后想办法用美观的方式呈现出来。

## 环境要求
需要 NodeJS 6.0+ 环境

## 安装  
``` shell
$ git clone https://github.com/tgsx/Web_MusicAPP.git
$ npm install
```

## 代码结构
没用过vue-cli的同学建议先了解以下这个脚手架以及它默认生成的目录结构和运行原理，我们代码编写基本都在`src`这个目录完成，目录结构是这样的：
```
- src
 +- api 《---- api的拼接
 +- assets 《---- 静态资源存放的目录
 +- components 《---- 我们写的可重用的组件
 +- pages 《--- -组件化的页面
 +- router 《---- 路由配置
 +- store 《---- 状态管理
```
 
## 注意点

- 同源策略
- 状态管理
- 路由
- 过渡效果
- DOM操作失效

前面提到`同源策略`，这里使用代理的方式来突破的，代理要在根目录的`config/index.js`里面进行配置。

另外一个比较重要的是状态管理，vue只提供了父子组件的交互，如果是非父子组件的话需要用到`vuex进行状态管理`，类似`react`的`redux`。

本项目并没有用到vue-router，需要学习的话可以参考[vue-router](https://router.vuejs.org/zh-cn/ "")，通过hash来模拟传统模式下的url可以在单页应用SEO优化时起到一定的作用。

vue本身提供了transition和transition-group等组件，我们只需按照官方的例子配置好样式类，就能达到不错的过度效果。

同时请求数据渲染页面的时候需要注意一些细节，有时候页面还没渲染完你就去操作DOM的话可能直到下一次点击你才能看到效果，这里需要用到vm.$nextTick,具体可以参照官方文档的[深入响应式原理](https://cn.vuejs.org/v2/guide/reactivity.html "")一节

> $nextTick 是在下次 DOM 更新循环结束之后执行延迟回调，在修改数据之后使用 $nextTick，则可以在回调中获取更新后的 DOM


 