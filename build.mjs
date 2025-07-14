import { build } from "vite";
import pkg from "./package.json" assert { type: "json" };
import fs from "fs";
import path from "path";

(async () => {
  await build({
    build: {
      outDir: "dist",
      sourcemap: true,
      lib: {
        name: "useMarkdown",
        entry: path.resolve("src/use-markdown.tsx"),
        fileName: "use-markdown",
        formats: ["es"], // ✅ Just ESM
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
          inlineDynamicImports: false,
        },
        treeshake: true,
      },
    },
  });

  const typeSource = "src/types/use-markdown.ts";
  const typeTarget = "dist/use-markdown.d.ts";

  if (fs.existsSync(typeSource)) {
    fs.copyFileSync(typeSource, typeTarget);
    console.log("✔ Copied types to dist/use-markdown.d.ts");
  } else {
    console.warn("⚠ No types found to copy");
  }
})();
