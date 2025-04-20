// vite.config.ts
import { Agent } from 'https';
import path from 'path';
import react from 'file:///C:/work/self/devops-vite/node_modules/.pnpm/@vitejs+plugin-react@4.2.1_vite@4.5.3/node_modules/@vitejs/plugin-react/dist/index.mjs';
import { visualizer } from 'file:///C:/work/self/devops-vite/node_modules/.pnpm/rollup-plugin-visualizer@5.12.0/node_modules/rollup-plugin-visualizer/dist/plugin/index.js';
import { defineConfig } from 'file:///C:/work/self/devops-vite/node_modules/.pnpm/vite@4.5.3_@types+node@20.12.7_less@4.2.0_sass@1.75.0_terser@5.30.4/node_modules/vite/dist/node/index.js';
import { createSvgIconsPlugin } from 'file:///C:/work/self/devops-vite/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@4.5.3/node_modules/vite-plugin-svg-icons/dist/index.mjs';
import tsconfigPaths from 'file:///C:/work/self/devops-vite/node_modules/.pnpm/vite-tsconfig-paths@4.3.2_typescript@5.4.5_vite@4.5.3/node_modules/vite-tsconfig-paths/dist/index.mjs';

var vite_config_default = defineConfig({
  base: './',
  esbuild: {
    // drop: ['console', 'debugger'],
  },
  css: {
    // 开css sourcemap方便找css
    devSourcemap: true,
    preprocessorOptions: {
      scss: {},
    },
  },
  plugins: [
    react(),
    // 同步tsconfig.json的path设置alias
    tsconfigPaths(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
    }),
    visualizer({
      open: false,
    }),
  ],
  server: {
    // 自动打开浏览器
    open: true,
    host: true,
    port: 3001,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path2) => path2.replace(/^\/api/, ''),
        // https://github.com/vitejs/vite/discussions/8998#discussioncomment-4408695
        agent: new Agent({ keepAlive: true, keepAliveMsecs: 2e4 }),
      },
    },
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    // rollupOptions: {
    //   output: {
    //     manualChunks(id) {
    //       if (id.includes('node_modules')) {
    //         // 让每个插件都打包成独立的文件
    //         return id.toString().split('node_modules/')[1].split('/')[0].toString();
    //       }
    //       return null;
    //     },
    //   },
    // },
    terserOptions: {
      compress: {
        // 生产环境移除console
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
export {
  vite_config_default as default,
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFx3b3JrXFxcXHNlbGZcXFxcZGV2b3BzLXZpdGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXHdvcmtcXFxcc2VsZlxcXFxkZXZvcHMtdml0ZVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovd29yay9zZWxmL2Rldm9wcy12aXRlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgQWdlbnQgfSBmcm9tICdodHRwcyc7XHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5cclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcclxuaW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gJ3JvbGx1cC1wbHVnaW4tdmlzdWFsaXplcic7XHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xyXG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN2Zy1pY29ucyc7XHJcbmltcG9ydCB0c2NvbmZpZ1BhdGhzIGZyb20gJ3ZpdGUtdHNjb25maWctcGF0aHMnO1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBiYXNlOiAnLi8nLFxyXG4gIGVzYnVpbGQ6IHtcclxuICAgIC8vIGRyb3A6IFsnY29uc29sZScsICdkZWJ1Z2dlciddLFxyXG4gIH0sXHJcbiAgY3NzOiB7XHJcbiAgICAvLyBcdTVGMDBjc3Mgc291cmNlbWFwXHU2NUI5XHU0RkJGXHU2MjdFY3NzXHJcbiAgICBkZXZTb3VyY2VtYXA6IHRydWUsXHJcbiAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XHJcbiAgICAgIHNjc3M6IHtcclxuXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIHBsdWdpbnM6IFtcclxuICAgIHJlYWN0KCksXHJcbiAgICAvLyBcdTU0MENcdTZCNjV0c2NvbmZpZy5qc29uXHU3Njg0cGF0aFx1OEJCRVx1N0Y2RWFsaWFzXHJcbiAgICB0c2NvbmZpZ1BhdGhzKCksXHJcbiAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7XHJcbiAgICAgIC8vIFx1NjMwN1x1NUI5QVx1OTcwMFx1ODk4MVx1N0YxM1x1NUI1OFx1NzY4NFx1NTZGRVx1NjgwN1x1NjU4N1x1NEVGNlx1NTkzOVxyXG4gICAgICBpY29uRGlyczogW3BhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnc3JjL2Fzc2V0cy9pY29ucycpXSxcclxuICAgICAgLy8gXHU2MzA3XHU1QjlBc3ltYm9sSWRcdTY4M0NcdTVGMEZcclxuICAgICAgc3ltYm9sSWQ6ICdpY29uLVtkaXJdLVtuYW1lXScsXHJcbiAgICB9KSxcclxuICAgIHZpc3VhbGl6ZXIoe1xyXG4gICAgICBvcGVuOiBmYWxzZSxcclxuICAgIH0pLFxyXG4gIF0sXHJcbiAgc2VydmVyOiB7XHJcbiAgICAvLyBcdTgxRUFcdTUyQThcdTYyNTNcdTVGMDBcdTZENEZcdTg5QzhcdTU2NjhcclxuICAgIG9wZW46IHRydWUsXHJcbiAgICBob3N0OiB0cnVlLFxyXG4gICAgcG9ydDogMzAwMSxcclxuICAgIHByb3h5OiB7XHJcbiAgICAgICcvYXBpJzoge1xyXG4gICAgICAgIHRhcmdldDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCcsXHJcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCAnJyksXHJcbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3ZpdGVqcy92aXRlL2Rpc2N1c3Npb25zLzg5OTgjZGlzY3Vzc2lvbmNvbW1lbnQtNDQwODY5NVxyXG4gICAgICAgIGFnZW50OiBuZXcgQWdlbnQoeyBrZWVwQWxpdmU6IHRydWUsIGtlZXBBbGl2ZU1zZWNzOiAyMDAwMCB9KSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBidWlsZDoge1xyXG4gICAgdGFyZ2V0OiAnZXNuZXh0JyxcclxuICAgIG1pbmlmeTogJ3RlcnNlcicsXHJcbiAgICAvLyByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAvLyAgIG91dHB1dDoge1xyXG4gICAgLy8gICAgIG1hbnVhbENodW5rcyhpZCkge1xyXG4gICAgLy8gICAgICAgaWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMnKSkge1xyXG4gICAgLy8gICAgICAgICAvLyBcdThCQTlcdTZCQ0ZcdTRFMkFcdTYzRDJcdTRFRjZcdTkwRkRcdTYyNTNcdTUzMDVcdTYyMTBcdTcyRUNcdTdBQ0JcdTc2ODRcdTY1ODdcdTRFRjZcclxuICAgIC8vICAgICAgICAgcmV0dXJuIGlkLnRvU3RyaW5nKCkuc3BsaXQoJ25vZGVfbW9kdWxlcy8nKVsxXS5zcGxpdCgnLycpWzBdLnRvU3RyaW5nKCk7XHJcbiAgICAvLyAgICAgICB9XHJcbiAgICAvLyAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIC8vICAgICB9LFxyXG4gICAgLy8gICB9LFxyXG4gICAgLy8gfSxcclxuICAgIHRlcnNlck9wdGlvbnM6IHtcclxuICAgICAgY29tcHJlc3M6IHtcclxuICAgICAgICAvLyBcdTc1MUZcdTRFQTdcdTczQUZcdTU4ODNcdTc5RkJcdTk2NjRjb25zb2xlXHJcbiAgICAgICAgZHJvcF9jb25zb2xlOiB0cnVlLFxyXG4gICAgICAgIGRyb3BfZGVidWdnZXI6IHRydWUsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWtRLFNBQVMsYUFBYTtBQUN4UixPQUFPLFVBQVU7QUFFakIsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsa0JBQWtCO0FBQzNCLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsNEJBQTRCO0FBQ3JDLE9BQU8sbUJBQW1CO0FBRzFCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLE1BQU07QUFBQSxFQUNOLFNBQVM7QUFBQTtBQUFBLEVBRVQ7QUFBQSxFQUNBLEtBQUs7QUFBQTtBQUFBLElBRUgsY0FBYztBQUFBLElBQ2QscUJBQXFCO0FBQUEsTUFDbkIsTUFBTSxDQUVOO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUVBLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQTtBQUFBLElBRU4sY0FBYztBQUFBLElBQ2QscUJBQXFCO0FBQUE7QUFBQSxNQUVuQixVQUFVLENBQUMsS0FBSyxRQUFRLFFBQVEsSUFBSSxHQUFHLGtCQUFrQixDQUFDO0FBQUE7QUFBQSxNQUUxRCxVQUFVO0FBQUEsSUFDWixDQUFDO0FBQUEsSUFDRCxXQUFXO0FBQUEsTUFDVCxNQUFNO0FBQUEsSUFDUixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsUUFBUTtBQUFBO0FBQUEsSUFFTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsUUFDTixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxTQUFTLENBQUNBLFVBQVNBLE1BQUssUUFBUSxVQUFVLEVBQUU7QUFBQTtBQUFBLFFBRTVDLE9BQU8sSUFBSSxNQUFNLEVBQUUsV0FBVyxNQUFNLGdCQUFnQixJQUFNLENBQUM7QUFBQSxNQUM3RDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixRQUFRO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBWVIsZUFBZTtBQUFBLE1BQ2IsVUFBVTtBQUFBO0FBQUEsUUFFUixjQUFjO0FBQUEsUUFDZCxlQUFlO0FBQUEsTUFDakI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbInBhdGgiXQp9Cg==
