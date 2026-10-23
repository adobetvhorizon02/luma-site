/* eslint-disable */
/* global WebImporter */

/**
 * Generic parser for blocks coming from an Edge Delivery source page.
 *
 * The source site already renders this repository's blocks, so a block in its
 * undecorated .plain.html is `<div class="name variant ...">` with one child div
 * per row and one grandchild div per cell. That maps 1:1 onto a DA block table:
 *   <div class="cards feature-support">  ->  | Cards (feature-support) |
 * Rows and cells are kept positionally (including empty ones), because the
 * Crosswalk-modelled blocks read their fields by row index.
 */
export default function parse(element, { document }) {
  const [name, ...variants] = [...element.classList];
  if (!name) return;

  const blockName = variants.length ? `${name} (${variants.join(', ')})` : name;

  const cells = [...element.children].map((row) => {
    const rowCells = [...row.children];
    if (!rowCells.length) return [row.textContent.trim()];
    return rowCells.map((cell) => (cell.childNodes.length ? [...cell.childNodes] : ''));
  });

  const block = WebImporter.Blocks.createBlock(document, { name: blockName, cells });
  element.replaceWith(block);
}
