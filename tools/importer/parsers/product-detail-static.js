/* eslint-disable */
/* global WebImporter */

import catalog from '../product-catalog.js';

/**
 * Parser for the rendered product-detail block of the source product page
 * (/en/product?productId=...). Produces a Product Detail Static block with the
 * product content authored as key/value rows. "You may also like" cards become
 * links to the other product pages.
 */

const byName = Object.fromEntries(Object.values(catalog).map((p) => [p.name, p]));

// Dynamic Media renditions carry ?width=...; keep the original asset URL
function originalImage(img, document) {
  const clean = document.createElement('img');
  const src = img.getAttribute('src') || '';
  clean.src = src.split('?')[0];
  clean.alt = img.getAttribute('alt') || '';
  return clean;
}

export default function parse(element, { document }) {
  const container = element.querySelector('.pd-container');
  if (!container) return;

  const cells = [];
  const img = container.querySelector('.pd-image img');
  if (img) cells.push(['image', originalImage(img, document)]);

  const category = container.querySelector('.pd-category')?.textContent.trim();
  if (category) cells.push(['category', category]);
  cells.push(['name', container.querySelector('.pd-name')?.textContent.trim() || '']);

  const price = container.querySelector('.pd-price')?.textContent.trim();
  if (price) cells.push(['price', price]);

  const description = container.querySelector('.pd-description');
  if (description) {
    description.querySelectorAll('[style]').forEach((el) => el.removeAttribute('style'));
    cells.push(['description', [...description.childNodes]]);
  }

  const related = [...element.querySelectorAll('.pd-rec-card-title')]
    .map((title) => byName[title.textContent.trim()])
    .filter(Boolean);
  if (related.length) {
    const list = document.createElement('ul');
    related.forEach((product) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = product.path;
      a.textContent = product.name;
      li.append(a);
      list.append(li);
    });
    cells.push(['related', list]);
  }

  const relatedTitle = element.querySelector('.pd-rec-title')?.textContent.trim();
  if (relatedTitle && relatedTitle !== 'YOU MAY ALSO LIKE') cells.push(['relatedproductstitle', relatedTitle]);

  const blockConfig = window.productPageSource?.blockConfig || {};
  ['productvieweventtype', 'addtocarteventtype', 'addtowishlisteventtype'].forEach((key) => {
    if (blockConfig[key]) cells.push([key, blockConfig[key]]);
  });

  element.replaceWith(WebImporter.Blocks.createBlock(document, { name: 'Product Detail Static', cells }));
}
