import babel from "@rollup/plugin-babel";
import external from "rollup-plugin-peer-deps-external";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import css from "rollup-plugin-import-css";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
      exports: "auto",
    },
    {
      file: "dist/index.es.js",
      format: "es",
      exports: "auto",
    },
  ],
  plugins: [
    external(),
    typescript({ clean: true }),
    babel({
      configFile: "./.babelrc",
      babelHelpers: "bundled",
    }),
    resolve(),
    commonjs(),
    css({ output: "butalert.css" }),
    terser(),
  ],
};
