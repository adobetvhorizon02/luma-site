/* eslint-disable */
/* global WebImporter */

/**
 * Transformer for product pages. The element is the source page's <main>.
 *  - beforeTransform: keep only the product-detail block's section.
 *  - afterTransform: add the source section's settings as Section Metadata and
 *    the page Metadata (title, description, productId, theme).
 */

function productId(payload) {
  const pageUrl = payload.params?.originalURL || payload.url || payload.document.location.href;
  return new URL(pageUrl).searchParams.get('productId') || '';
}

function summary(element) {
  const text = element?.querySelector('p')?.textContent.replace(/\s+/g, ' ').trim() || '';
  if (text.length <= 160) return text;
  return `${text.slice(0, text.lastIndexOf(' ', 157))}...`;
}

export default function transform(hookName, element, payload) {
  const { document } = payload;

  if (hookName === 'beforeTransform') {
    const section = element.querySelector('.product-detail')?.closest('main > div');
    [...element.children].forEach((child) => { if (child !== section) child.remove(); });
    section?.querySelectorAll(':scope > div > :not(.product-detail)').forEach((el) => el.remove());
  }

  if (hookName === 'afterTransform') {
    const { sectionAttributes = {} } = window.productPageSource || {};
    const sectionCells = Object.entries(sectionAttributes);
    if (sectionCells.length) {
      element.append(WebImporter.Blocks.createBlock(document, { name: 'Section Metadata', cells: sectionCells }));
    }

    const block = element.querySelector('table');
    const rows = Object.fromEntries([...(block?.querySelectorAll('tr') || [])]
      .map((tr) => [...tr.children])
      .filter((tds) => tds.length === 2)
      .map(([key, value]) => [key.textContent.trim(), value]));

    const meta = { Title: rows.name?.textContent.trim() || document.title };
    const description = summary(rows.description);
    if (description) meta.Description = description;
    meta.productId = productId(payload);
    const theme = document.head.querySelector('meta[name="theme"]')?.getAttribute('content');
    if (theme) meta.theme = theme;

    element.append(WebImporter.Blocks.getMetadataBlock(document, meta));
  }
}
