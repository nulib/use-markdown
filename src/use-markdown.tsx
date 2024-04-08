import { UseMarkdownParams, UseMarkdownReturn } from "types/use-markdown";

import React from "react";
import { convertMarkdownToHtml } from "./lib/markdown-helpers";

function useMarkdown(markdown: UseMarkdownParams): UseMarkdownReturn {
  const [html, setHtml] = React.useState<string>("");

  React.useEffect(() => {
    (async () => {
      const htmlContent = await convertMarkdownToHtml(markdown);
      setHtml(htmlContent);
    })();
  }, [markdown]);

  return { html, jsx: <div dangerouslySetInnerHTML={{ __html: html }} /> };
}

export default useMarkdown;
