import type { Options } from "tsup";
import { defineConfig } from "tsup";
import path from "path";

const commonConfig: Options = {
    minify: true,
    dts: true,
    format: ["esm", "cjs"],
    sourcemap: true,
    clean: true,
    treeshake: true,
    target: "es5",
    tsconfig: path.resolve(__dirname, "./tsconfig.json"),
};
export default defineConfig([
    {
        ...commonConfig,
        entry: ["src/index.ts"],
        outDir: "dist",
        external: ["react", "react-dom"],
    },
]);
