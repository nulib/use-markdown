import { convertMarkdownToHtml } from "./markdown-helpers";

describe("convertMarkdownToHtml", () => {
  it("should convert new lines to distinct html elements", async () => {
    const html = await convertMarkdownToHtml("# Heading\n\nThis is a bold.");
    expect(html).toBe(`<h1>Heading</h1>
<p>This is a bold.</p>`);
  });

  it("should convert code to html", async () => {
    const html = await convertMarkdownToHtml("`code`");
    expect(html).toBe(`<p><code>code</code></p>`);
  });

  it("should convert bold to html", async () => {
    const html = await convertMarkdownToHtml("**bold**");
    expect(html).toBe(`<p><strong>bold</strong></p>`);
  });

  it("should convert italic to html", async () => {
    const html = await convertMarkdownToHtml("*italic*");
    expect(html).toBe(`<p><em>italic</em></p>`);
  });

  it("should convert links to html", async () => {
    const html = await convertMarkdownToHtml("[link](https://example.com)");
    expect(html).toBe(`<p><a href="https://example.com">link</a></p>`);
  });

  it("should convert images to html", async () => {
    const html = await convertMarkdownToHtml(
      "![alt](https://example.com/image.png)"
    );
    expect(html).toBe(
      `<p><img src="https://example.com/image.png" alt="alt"></p>`
    );
  });

  it("should convert blockquotes to html", async () => {
    const html = await convertMarkdownToHtml("> blockquote");
    expect(html).toBe(`<blockquote>
<p>blockquote</p>
</blockquote>`);
  });

  it("should convert lists to html", async () => {
    const html = await convertMarkdownToHtml("- list");
    expect(html).toBe(`<ul>
<li>list</li>
</ul>`);
  });

  it("should convert nested lists to html", async () => {
    const html = await convertMarkdownToHtml("- list\n  - nested");
    expect(html).toBe(`<ul>
<li>list
<ul>
<li>nested</li>
</ul>
</li>
</ul>`);
  });

  it("should convert tables to html", async () => {
    const html = await convertMarkdownToHtml("| a | b |\n|---|---|\n| c | d |");
    expect(html.trim()).toBe(
      `<table><thead><tr><th>a</th><th>b</th></tr></thead><tbody><tr><td>c</td><td>d</td></tr></tbody></table>`
    );
  });

  it("should convert strikethrough to html", async () => {
    const html = await convertMarkdownToHtml("~~strikethrough~~");
    expect(html).toBe(`<p><del>strikethrough</del></p>`);
  });

  it("should handle footnotes", async () => {
    const html = await convertMarkdownToHtml("footnote[^1]\n\n[^1]: note");
    expect(html.trim()).toBe(
      `<p>footnote<sup><a href="#user-content-fn-1" id="user-content-fnref-1" data-footnote-ref="" aria-describedby="footnote-label">1</a></sup></p>
<section data-footnotes="" class="footnotes"><h2 class="sr-only" id="footnote-label">Footnotes</h2>
<ol>
<li id="user-content-fn-1">
<p>note <a href="#user-content-fnref-1" data-footnote-backref="" aria-label="Back to reference 1" class="data-footnote-backref">↩</a></p>
</li>
</ol>
</section>`
    );
  });

  it("should convert link literals to html", async () => {
    const html = await convertMarkdownToHtml("https://example.com");
    expect(html).toBe(
      `<p><a href="https://example.com">https://example.com</a></p>`
    );
  });

  it("should retain inline html", async () => {
    const html = await convertMarkdownToHtml(
      `<div style="color: red;">html</div>`
    );
    expect(html).toBe(`<div style="color: red;">html</div>`);
  });
});
