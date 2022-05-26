import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  root: "src/client",
  build: {
    outDir: "../../dist_client",
    sourcemap: true,
  },
  plugins: [react()],
})
