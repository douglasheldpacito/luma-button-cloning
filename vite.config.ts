import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
  plugins: [reactRouter(), tsconfigPaths()],
  base: "/luma-button-cloning/",
});
