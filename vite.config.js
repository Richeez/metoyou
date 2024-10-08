import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
// import { sveltekit } from '@sveltejs/kit/vite';

// export default ({ mode }) => {
//     // Extends 'process.env.*' with VITE_*-variables from '.env.(mode=production|development)'
//     process.env = {...process.env, ...loadEnv(mode, process.cwd())};
//     return defineConfig({
//         plugins: [sveltekit(), svgr(), react()]
//     });
// };

// // https://vitejs.dev/config/
export default defineConfig({
  envPrefix: "APP_",
  plugins: [svgr(), react()],
  define: {
    global: "window",
  },
  resolve: {
    alias: {
      "@": "/src",
      "@modules": `/src/modules`,
      "@configs": `/src/app`,
      "@components": `/src/Components`,
      "@providers": `/src/manager`,
      "@utils": `/src/utils`,
    },
  },
  // define: {
  //   "process.env.NODE_ENV": JSON.stringify(
  //     import.meta?.env?.NODE_ENV || "development"
  //   ),
  // },
});
