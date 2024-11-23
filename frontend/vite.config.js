import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        {
            name: "isolation",
            configureServer(server) {
                server.middlewares.use((_req, res, next) => {
                    res.setHeader(
                        "Cross-Origin-Opener-Policy",
                        "same-origin-allow-popups"
                    );
                    res.setHeader(
                        "Cross-Origin-Embedder-Policy",
                        "unsafe-none"
                    );
                    next();
                });
            },
        },
    ],
});
