/* eslint-disable */
/* global WebImporter */

import productDetailStaticParser from './parsers/product-detail-static.js';
import productPageTransformer from './transformers/product-page.js';
import loadProductPage from './utils/product-page-loader.js';
import catalog from './product-catalog.js';

const PAGE_TEMPLATE = {
  name: 'product-page',
  description: 'Product detail page rendered by the source /en/product?productId=<SKU> page. Each product becomes a static page under its listing folder (/en/<category>-products/<product-name>) with a Product Detail Static block and the productId in the page metadata.',
  representativeUrl: 'https://main--luma-site-14-08--livedemoservices.aem.live/en/product?productId=MH07',
  blocks: [
    {
      name: 'product-detail-static',
      instances: ['main .product-detail.block'],
    },
  ],
};

const parsers = { 'product-detail-static': productDetailStaticParser };
const transformers = [productPageTransformer];

function executeTransformers(hookName, element, payload) {
  const enhancedPayload = { ...payload, template: PAGE_TEMPLATE };
  transformers.forEach((fn) => {
    try { fn(hookName, element, enhancedPayload); }
    catch (e) { console.error(`Transformer failed at ${hookName}:`, e); }
  });
}

function findBlocksOnPage(document, template) {
  const pageBlocks = [];
  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      document.querySelectorAll(selector).forEach((element) => {
        pageBlocks.push({ name: blockDef.name, selector, element });
      });
    });
  });
  return pageBlocks;
}

export default {
  onLoad: async ({ document }) => {
    await loadProductPage(document);
  },

  transform: (payload) => {
    const { document, url, params } = payload;
    const main = document.querySelector('main');

    const sku = new URL(params.originalURL).searchParams.get('productId');
    const product = catalog[sku];
    if (!product) throw new Error(`Product ${sku} is not in any listing folder (product-catalog.js)`);

    executeTransformers('beforeTransform', main, payload);

    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
    const related = [...document.querySelectorAll('.pd-rec-card-title')].map((el) => el.textContent.trim());
    pageBlocks.forEach((block) => {
      if (!block.element.parentNode) return;
      const parser = parsers[block.name];
      if (!parser) return;
      try { parser(block.element, { document, url, params }); }
      catch (e) { console.error(`Failed to parse ${block.name} (${block.selector}):`, e); }
    });

    // Section Metadata and page Metadata (incl. productId) come from the transformer
    executeTransformers('afterTransform', main, payload);

    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    return [{
      element: main,
      path: WebImporter.FileUtils.sanitizePath(product.path),
      report: {
        title: product.name,
        template: PAGE_TEMPLATE.name,
        productId: sku,
        blocks: pageBlocks.map((b) => b.name),
        related: related.join(', '),
        relatedUnlinked: related.filter((name) => !Object.values(catalog).some((p) => p.name === name)).join(', '),
      },
    }];
  },
};
