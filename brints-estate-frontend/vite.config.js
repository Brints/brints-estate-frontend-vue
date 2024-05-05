import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import envCompatible from "vite-plugin-env-compatible";
// https://vitejs.dev/config/
export default defineConfig({
<<<<<<< HEAD
    plugins: [vue()],
=======
    plugins: [vue(), envCompatible()],
>>>>>>> bb83104d9b2167d7065c7879c930181c513b7dbe
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
<<<<<<< HEAD
=======
    },
    build: {
        rollupOptions: {
            external: ["@fortawesome/vue-fontawesome"],
        },
>>>>>>> bb83104d9b2167d7065c7879c930181c513b7dbe
    },
});
