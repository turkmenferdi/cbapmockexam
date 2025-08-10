import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ command }) => {
  // Ortak eklentiler
  const plugins: Plugin[] = [react()];

  // Sadece local geliştirmede Express'i bağla
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
        // Prod'da zaten kullanılmayacak; deny list sade kalsın
        deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**"]
      },
    },
    build: {
      outDir: "dist",      // Vercel Output Directory ile uyumlu
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

// Sadece geliştirme sırasında Express'i Vite dev server'a ekleyen plugin
function devExpressPlugin(): Plugin {
  return {
    name: "dev-express-plugin",
    apply: "serve", // sadece dev (vite serve) sırasında çalışır
    async configureServer(server) {
      // Dinamik import: Prod build sırasında asla çağrılmaz
      const { createServer } = await import("./server/index.ts"); // ./server yeterliyse onu yaz
      const app = createServer();
      server.middlewares.use(app);
    },
  };
}
