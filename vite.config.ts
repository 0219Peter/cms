import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {}
  },
  server: {
    proxy: {
      "^/api": {
        target: "http://152.136.185.210:5000",
        rewrite: (path) => path.replace(/^\/api/, ""),
        changeOrigin: true
      }
    }
  }
  // css: {
  //   // css预处理器
  //   preprocessorOptions: {
  //     less: {
  //       charset: false,

  //       javascriptEnabled: true
  //     },
  //     scss: {
  //       charset: false,
  //       javascriptEnabled: true
  //     }
  //   }
  // }
})
