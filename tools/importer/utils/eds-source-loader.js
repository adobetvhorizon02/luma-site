/* eslint-disable */

/**
 * The live page has already been decorated by the source site's JavaScript, so
 * replace the body with the page's undecorated `.plain.html`: one <div> per
 * section, blocks as <div class="...">. The head (metadata) is left untouched.
 * Called from the import script's onLoad, before transform runs.
 */
function plainUrl(pageUrl) {
  const { origin, pathname } = new URL(pageUrl);
  const path = pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/index';
  return `${origin}${path}.plain.html`;
}

export default async function loadSourceDocument(document) {
  const url = plainUrl(document.location.href);
  const resp = await fetch(url, { cache: 'no-store' });
  if (!resp.ok) throw new Error(`Failed to load source ${url}: ${resp.status}`);
  document.body.innerHTML = await resp.text();
}
