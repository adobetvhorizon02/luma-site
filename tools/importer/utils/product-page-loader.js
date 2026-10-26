/* eslint-disable */

/**
 * The source product page renders its product-detail block from GraphQL after
 * load. Wait for it to finish, then keep the block's authored settings (event
 * types) and its section metadata from the undecorated /en/product.plain.html,
 * since decoration replaces them. Called from the import script's onLoad.
 */
const TIMEOUT = 30000;

async function waitFor(check) {
  const start = Date.now();
  while (Date.now() - start < TIMEOUT) {
    if (check()) return true;
    // eslint-disable-next-line no-await-in-loop
    await new Promise((resolve) => { setTimeout(resolve, 250); });
  }
  return false;
}

export default async function loadProductPage(document) {
  const loaded = await waitFor(() => document.querySelector('.product-detail[data-block-status="loaded"] .pd-container, .product-detail .pd-error'));
  if (!loaded || document.querySelector('.product-detail .pd-error')) {
    throw new Error(`Product did not render: ${document.querySelector('.product-detail .pd-error')?.textContent || 'timeout'}`);
  }
  // recommendation cards render in the same pass; give lazy images a moment
  await waitFor(() => [...document.querySelectorAll('.pd-rec-card img')].every((img) => img.getAttribute('src')));

  const { origin, pathname } = document.location;
  const resp = await fetch(`${origin}${pathname.replace(/\/$/, '')}.plain.html`, { cache: 'no-store' });
  const source = new DOMParser().parseFromString(await resp.text(), 'text/html');

  const blockConfig = {};
  source.querySelectorAll('.product-detail > div').forEach((row) => {
    const [key, value] = row.children;
    if (key && value && !value.querySelector('a')) blockConfig[key.textContent.trim()] = value.textContent.trim();
  });

  const sectionAttributes = {};
  const section = source.querySelector('.product-detail')?.parentElement;
  [...(section?.attributes || [])].forEach((attr) => {
    if (attr.name.startsWith('data-') && attr.value.trim()) sectionAttributes[attr.name.slice(5)] = attr.value.trim();
  });

  window.productPageSource = { blockConfig, sectionAttributes };
}
