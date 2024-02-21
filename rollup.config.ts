import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import typescript from "rollup-plugin-typescript2";
import dts from "rollup-plugin-dts";
import pkg from "./package.json" assert { type: "json" };
import type { RollupOptions } from "rollup";

const config: RollupOptions[] = [
    {
        input: "src/index.ts",
        output: [
            { file: pkg.main, format: "cjs", sourcemap: true },
            { file: pkg.module, format: "esm", sourcemap: true },
        ],
        plugins: [
            babel({
                babelHelpers: "bundled",
                exclude: "node_modules/**",
                presets: ["@babel/preset-env", "@babel/preset-react"],
            }),
            resolve({ extensions: [".ts", ".tsx"] }),
            commonjs(),
            terser(),
            typescript({
                tsconfig: "tsconfig.json",
            }),
        ],
        external: Object.keys(pkg.peerDependencies),
    },
    {
        input: "src/index.ts",
        output: [{ file: "dist/index.d.ts", format: "es" }],
        plugins: [dts()],
    },
];

export default config;
