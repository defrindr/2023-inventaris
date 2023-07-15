import react from "@vitejs/plugin-react-swc";
import Unfonts from "unplugin-fonts/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    Unfonts({
      google: {
        families: ["Poppins"],
      },
    }),
  ],
  server: {
    watch: {
      usePolling: true,
    },
  },
});
