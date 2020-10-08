// 这段代码其实不太需要，因为项目中全是通过tsx开发的
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}
// less 模块导入配置
declare module "*.less" {
  const less: any;
  export default less;
}