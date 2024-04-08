import { build } from "vite";
import pkg from "./package.json" assert { type: "json" };
import fs from "fs";

(async () => {
  await build({
    build: {
      outDir: `dist`,
      sourcemap: true,
      lib: {
        name: "use-markdown",
        entry: "./src/use-markdown.tsx",
        fileName: "use-markdown",
      },
      minify: "esbuild",
      rollupOptions: {
        external: [
          ...Object.keys(pkg.dependencies || {}),
          ...Object.keys(pkg.peerDependencies || {}),
        ],
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
            "rehype-raw": "rehypeRaw",
            "rehype-stringify": "rehypeStringify",
            "remark-gfm": "remarkGfm",
            "remark-parse": "remarkParse",
            "remark-rehype": "remarkRehype",
            unified: "unified",
          },
          exports: "named",
          inlineDynamicImports: true,
        },
        treeshake: true,
      },
    },
  });

  console.log("Copying types to dist/use-markdown.d.ts");
  fs.copyFileSync("src/types/use-markdown.ts", "dist/use-markdown.d.ts");
})();
