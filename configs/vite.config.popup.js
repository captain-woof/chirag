import { defineConfig } from "vite";
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import path from "path";

export default defineConfig(({
    command, mode
}) => {
    const isDev = mode === "development";

    return {
        root: "src/popup",
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "../", 'src', "popup"),
            }
        },
        build: {
            rollupOptions: {
                input: "src/popup/index.html",
                output: {
                    format: "es"
                }
            },
            outDir: "../../dist",
            assetsDir: "",
            target: "es2015",
            sourcemap: isDev ? "inline" : false,
            minify: isDev ? false : "terser",
        },
        server: {
            port: 8000
        },
        plugins: [
            vue({
                isProduction: !isDev,
                style: {
                    trim: !isDev
                },
                template: {
                    transformAssetUrls
                }
            }),
            vuetify({
                styles: {
                    configFile: "styles/vuetify_settings.scss"
                }
            })
        ]
    }
});