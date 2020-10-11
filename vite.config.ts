// const path = require('path')
module.exports = {
    alias: {},
    // hostname: process.env.VITE_HOST,
    // port: process.env.VITE_PORT,
    // 是否自动在浏览器打开
    // open: false,
    // 是否开启 https
    // https: false,
    // 服务端渲染
    // ssr: false,
    /**
     * Base public path when served in production.
     * @default '/'
     */
    // base: process.env.VITE_BASE_URL,
    /**
     * Directory relative from `root` where build output will be placed. If the
     * directory exists, it will be removed before the build.
     * @default 'dist'
     */
    // outDir: process.env.VITE_OUTPUT_DIR,
    // 反向代理
    proxy: {
        // Vue-cli
        // '/api': {
        //     target: 'http://localhost:9007',
        //     changeOrigin: true,
        //     ws: false,
        //     // "logLevel": "debug",
        //     // pathRewrite:{
        //     //     '^/api':'/'
        //     // }
        // },
        '/api': {
            target: 'http://localhost:9007',
            changeOrigin: true,
            ws: false,
            // "logLevel": "debug",
            rewrite: (path: any) => path.replace(/^\/api/, '')
        },
    }
}