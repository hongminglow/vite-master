import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { analyzer } from "vite-bundle-analyzer";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tailwindcss(),
    svgr({
      include: "**/*.svg?react",
      svgrOptions: {
        icon: true,
        titleProp: true,
      },
    }),
    analyzer({
      enabled: mode === "analyze",
      analyzerMode: "static",
      fileName: "reports/bundle-report",
      reportTitle: "React Daily Lab Bundle Report",
      openAnalyzer: true,
      defaultSizes: "gzip",
      summary: true,
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    sourcemap: mode === "analyze",
  },
}));
