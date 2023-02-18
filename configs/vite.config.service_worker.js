import { defineConfig } from "vite";

export default defineConfig(({ command, mode }) => {
    const isDev = mode === "development";

    return {
        root: "src/service_worker",
        build: {
            rollupOptions: {
                input: "src/service_worker/index.ts",
                output: {
                    entryFileNames: 'service_worker.js',
                    manualChunks: false,
                    inlineDynamicImports: true,
                }
            },
            target: "es2015",
            sourcemap: isDev ? "inline" : false,
            minify: isDev ? false : "terser",
            outDir: "../../dist",
            assetsDir: "",
            copyPublicDir: false
        },
    }
});