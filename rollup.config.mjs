import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import del from "rollup-plugin-delete";
import copy from 'rollup-plugin-copy';
import json from "@rollup/plugin-json";

export default defineConfig([


    // For service-worker + essentials
    {
        input: "src/service_worker/index.ts",
        cache: true,
        output: {
            file: "dist/service_worker.js",
            format: "es",
            sourcemap: process.env.BUILD_ENV === "development"
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
    }
]);