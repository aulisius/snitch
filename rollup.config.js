import babel from "@rollup/plugin-babel";
import filesize from "rollup-plugin-filesize";
import pkg from "./package.json";

let createBuild = (format, file) => ({
  input: pkg.source,
  external: Object.keys(pkg.peerDependencies),
  output: { file, format },
  plugins: [babel({ babelHelpers: "bundled" }), filesize()],
});

export default [createBuild("cjs", pkg.main), createBuild("es", pkg.module)];
