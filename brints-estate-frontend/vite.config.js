import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import envCompatible from "vite-plugin-env-compatible";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), envCompatible()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    vue: ["vue"],
                    "vue-router": ["vue-router"],
                    pinia: ["pinia"],
                    axios: ["axios"],
                    "vue-i18n": ["vue-i18n"],
                    "vue-fontawesome": ["@fortawesome/vue-fontawesome"],
                },
            },
        },
    },
});
