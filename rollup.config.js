import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import copy from "rollup-plugin-copy-assets";
import filesize from "rollup-plugin-filesize";
import { uglify } from "rollup-plugin-uglify";
import { minify } from "uglify-es";
import pkg from "./package.json";

let INPUT = "src/index.js";
let peerDependencies = Object.keys(pkg.peerDependencies);
let createBuild = ({ input, filename, format, external, plugins }) => ({
  input,
  external,
  output: {
    file: filename,
    format
  },
  plugins
});

let createCjsBuild = ({ production = false }) => {
  let plugins = [
    babel({
      exclude: "node_modules/**"
    }),
    commonjs(),
    filesize()
  ];
  if (production) {
    plugins.push(uglify({ sourceMap: false }, minify));
  }
  let filename = `lib/cjs/snitch${production ? ".min" : ""}.js`;
  return createBuild({
    input: INPUT,
    filename,
    format: "cjs",
    external: peerDependencies,
    plugins
  });
};

let createESBuild = _ =>
  createBuild({
    input: INPUT,
    filename: "lib/es/snitch.js",
    format: "es",
    external: peerDependencies,
    plugins: [
      babel({
        exclude: "node_modules/**"
      }),
      commonjs(),
      copy({
        assets: ["./index.cjs.js"]
      }),
      uglify({ sourceMap: false }, minify),
      filesize()
    ]
  });

export default [
  createCjsBuild({ production: false }),
  createCjsBuild({ production: true }),
  createESBuild()
];
