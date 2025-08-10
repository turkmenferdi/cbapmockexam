import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ command }) => {
  // Ortak eklentiler
  const plugins: Plugin[] = [react()];

  // Sadece geliştirme (vite serve) sırasında Express'i bağla
  if (command === "serve") {
    plugins.push(devExpressPlugin());
  }

  return {
    base: "/", // SPA kökten yayınlanacak
    server: {
      host: "::",
      port: 8080,
      fs: {
        allow: ["./client", "./shared"],
        // Prod'da kullanılmadığı için deny sade tutuldu
        deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**"],
      },
    },
    build: {
      outDir: "dist",   // Vercel Output Directory ile uyumlu
      sourcemap: false,
    },
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./client"),
        "@shared": path.resolve(__dirname, "./shared"),
      },
    },
  };
});

// Sadece geliştirmede çalışan Express middleware plugini
function devExpressPlugin(): Plugin {
  return {
    name: "dev-exp
