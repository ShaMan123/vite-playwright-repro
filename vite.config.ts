import react from "@vitejs/plugin-react";
import { readFileSync } from "fs";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Use React 17+ JSX transform
      jsxRuntime: "automatic",
    }),
  ],

  // Development server configuration
  server: {
    port: Number(process.env.PORT || 3001),
    host: true,
    open: true,
    https: {
      key: readFileSync("./cert/key.pem"),
      cert: readFileSync("./cert/cert.pem"),
    },
  },

  build: {
    outDir: "build",
    sourcemap: true,
  },

  // Environment variables configuration
  envPrefix: "VITE_",
});
