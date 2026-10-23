/* eslint-disable */
/* global WebImporter */

import edsBlockParser from './parsers/eds-block.js';
import edsSourceTransformer from './transformers/eds-source.js';
import loadSourceDocument from './utils/eds-source-loader.js';

const PAGE_TEMPLATE = {
  name: 'eds-page',
  description: 'Any page of the source Edge Delivery (Crosswalk-authored) site. The source already uses this repository\'s blocks, so every block is carried over table-for-table from the page\'s undecorated .plain.html.',
  representativeUrl: 'https://main--luma-site-14-08--livedemoservices.aem.live/',
  blocks: [
    {
      name: 'eds-block',
      instances: ['body > div > div[class]'],
    },
  ],
};

const parsers = { 'eds-block': edsBlockParser };
const transformers = [edsSourceTransformer];

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
    await loadSourceDocument(document);
  },

  transform: (payload) => {
    const { document, url, params } = payload;
    const main = document.body;

    executeTransformers('beforeTransform', main, payload);

    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
    const blockNames = pageBlocks.map((b) => b.element.className);
    pageBlocks.forEach((block) => {
      if (!block.element.parentNode) return;
      const parser = parsers[block.name];
      if (!parser) return;
      try { parser(block.element, { document, url, params }); }
      catch (e) { console.error(`Failed to parse ${block.name} (${block.selector}):`, e); }
    });

    // Section breaks and page metadata come from the source's section attributes
    // and head, so the transformer builds them instead of WebImporter.rules.createMetadata.
    executeTransformers('afterTransform', main, payload);

    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    const rawPath = new URL(params.originalURL).pathname
      .replace(/\/$/, '')
      .replace(/\.html?$/, '');
    const path = WebImporter.FileUtils.sanitizePath(rawPath === '' ? '/index' : rawPath);

    return [{
      element: main,
      path,
      report: { title: document.title, template: PAGE_TEMPLATE.name, blocks: blockNames },
    }];
  },
};
