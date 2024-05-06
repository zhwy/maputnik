import replace from "@rollup/plugin-replace";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import istanbul from "vite-plugin-istanbul";

export default defineConfig({
  server: {
    port: 7777,
    proxy: {
      "/geoservice-api": {
        target: "http://10.11.14.211:30879", // 接口的域名
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        // rewrite: (path) => path.replace(/^\{domain\}/, ""),
      },
      "/oss-static-api": {
        target: "http://10.11.14.211:30879", // 接口的域名
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    sourcemap: true,
  },
  plugins: [
    replace({
      preventAssignment: true,
      include: /\/jsonlint-lines-primitives\/lib\/jsonlint.js/,
      delimiters: ["", ""],
      values: {
        "_token_stack:": "",
      },
    }) as any,
    react(),
    istanbul({
      cypress: true,
      requireEnv: false,
      nycrcPath: "./.nycrc.json",
      forceBuildInstrument: true, //Instrument the source code for cypress runs
    }),
  ],
  define: {
    global: "window",
  },
});
