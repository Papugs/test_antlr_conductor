import nodeResolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";

export default {
  plugins: [
    nodeResolve(),
    typescript({
      exclude: ["**/*.test.ts", "**/*.spec.ts", "src/DevTest.ts"],
    }),
  ],
  input: "src/index.ts",
  output: {
    plugins: [terser()],
    dir: "dist",
    format: "iife",
    sourcemap: true,
  },
};
