# vue3-vite-app-frame-ts
新建 vue3 目前有俩种，分别是 vite 和 @vue/cli。【本库使用vite构建,且只使用.tsx文件格式，去除.vue文件】   
在 Vue-Cli 使用中，发现热更新和编译页面非常慢，所以Vue3.0作者放弃基于 Webpack 开发的脚手架，全新开发新的脚手架：Vite 。

#### 介绍
1. 创建模式： yarn create vite-app {pro-name}   
2. typeScript：   yarn add typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-plugin-vue -D

### tsx
[Vue3.0实践：使用Vue3.0做JSX(TSX)风格的组件开发](https://blog.csdn.net/learn8more/article/details/107970726)  
[使用 JSX/TSX 开发 Vue3 组件](https://zhuanlan.zhihu.com/p/153387704)  
[vue3.0 tsx](https://iiong.com/vue3-use-notes/)  

### vue-router  
yarn add vue-router@4.0.0-beta.13  [【可以到npm官网查查最新版本】](https://www.npmjs.com/package/vue-router)   

此时main.ts:   
```
import { createApp } from 'vue'; 
import App from './App';
import './index.css'
import router from './router';

createApp(App).use(router).mount('#app');
```
