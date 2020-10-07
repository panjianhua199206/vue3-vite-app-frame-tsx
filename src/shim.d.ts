// 这个文件其实不太需要，因为项目中全是通过tsx开发的
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}