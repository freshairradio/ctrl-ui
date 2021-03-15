import { terser } from "rollup-plugin-terser";
import css from "rollup-plugin-css-only";
import copy from "rollup-plugin-copy";
import { promises as fs } from "fs";
export default {
  input: "build/dist/index.js",
  output: {
    format: "iife",
    name: "app",
    dir: "dist/",
    assetFileNames: "built/[name]-[hash][extname]",
    entryFileNames: "built/[name]-[hash].js"
  },
  plugins: [
    css({ output: "bundle.css" }),
    copy({
      targets: [{ src: "public/*", dest: "dist" }]
    }),
    terser(),
    {
      async generateBundle(options, bundle) {
        const entrypoint = Object.keys(bundle)[0];
        let html = await fs.readFile("./public/index.html", "utf8");
        let css = await fs.readFile("./build/dist/global.css", "utf8");
        html = html.replace("/dist/index.js", `/${entrypoint}`);
        const ref = this.emitFile({
          type: "asset",
          name: "global.css",
          source: css
        });
        html = html.replace("/dist/global.css", `/${this.getFileName(ref)}`);

        this.emitFile({
          type: "asset",
          fileName: "index.html",
          source: html
        });
      }
    }
  ]
};
