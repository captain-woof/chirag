import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import del from "rollup-plugin-delete";
import copy from "rollup-plugin-copy";
import vue from "@vitejs/plugin-vue";
import babel from "@rollup/plugin-babel";
import replace from "@rollup/plugin-replace";
import html from "rollup-plugin-generate-html-template";
import styles from "rollup-plugin-styles";

export default defineConfig([

    // For service-worker + essentials
    {
        input: "src/service_worker/index.ts",
        cache: true,
        output: {
            file: "dist/service_worker.js",
            format: "es",
            sourcemap: isDev
        },
        plugins: [
            del({
                targets: [
                    "dist/service_worker.*",
                    "dist/manifest.json",
                    "icons/"
                ]
            }),
            typescript({ target: "ES5" }),
            terser({
                compress: process.env.BUILD_ENV === "production"
            }),
            copy({
                targets: [
                    {
                        src: "src/manifest.json",
                        dest: "dist/"
                    },
                    {
                        src: "src/icons/**/*",
                        dest: "dist/icons/"
                    }
                ]
            })
        ]
    },

    // For Vue app for pop-up
    {
        input: "src/popup/index.ts",
        cache: true,
        output: {
            format: "esm",
            file: "dist/app.js",
            sourcemap: isDev,
            assetFileNames: "[name][extname]",
        },
        watch: {
            buildDelay: 250,
            clearScreen: true
        },
        plugins: [
            resolve({
                browser: true,
                extensions: [".js", ".ts", ".vue"],
            }),
            vue({
                isProduction: !isDev,
                style: {
                    trim: !isDev
                }
            }),
            babel({
                babelHelpers: "bundled",
                extensions: [".js", ".ts", ".vue"],
                exclude: ["**/*.scss", "**/*.css"]
            }),
            styles({
                minimize: !isDev,
                mode: ["extract", "styles.css"]
            }),
            replace({
                preventAssignment: true,
                values: {
                    'process.env.NODE_ENV': JSON.stringify(process.env.BUILD_ENV)
                }
            }),
            (isDev && terser()),
            html({
                template: 'src/popup/template.html',
                target: 'dist/popup.html',
            }),
        ]
    }
]);

// HELPERS
var isDev = process.env.BUILD_ENV === "development";
