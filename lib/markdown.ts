/**
 * Minimal markdown renderer for blog post bodies.
 * Supports: # ## ### headings, paragraphs, and basic line breaks.
 * Blog content is authored by trusted admins only (no public submission),
 * so we don't need a sanitizer for untrusted HTML here — but we still
 * escape raw text before re-inserting it as markup, since admin-authored
 * markdown could still contain accidental angle brackets.
 */
function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function renderMarkdown(markdown: string): string {
  const lines = markdown.split("\n");
  const html: string[] = [];
  let inParagraph = false;

  function closeParagraph() {
    if (inParagraph) {
      html.push("</p>");
      inParagraph = false;
    }
  }

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (line === "") {
      closeParagraph();
      continue;
    }

    const h3 = line.match(/^### (.+)/);
    const h2 = line.match(/^## (.+)/);
    const h1 = line.match(/^# (.+)/);

    if (h1) {
      closeParagraph();
      html.push(`<h1>${inlineFormat(h1[1])}</h1>`);
      continue;
    }
    if (h2) {
      closeParagraph();
      html.push(`<h2>${inlineFormat(h2[1])}</h2>`);
      continue;
    }
    if (h3) {
      closeParagraph();
      html.push(`<h3>${inlineFormat(h3[1])}</h3>`);
      continue;
    }

    if (!inParagraph) {
      html.push("<p>");
      inParagraph = true;
    } else {
      html.push("<br />");
    }
    html.push(inlineFormat(line));
  }
  closeParagraph();

  return html.join("\n");
}

function inlineFormat(text: string): string {
  const escaped = escapeHtml(text);
  return escaped
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
}
