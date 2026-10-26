import { getMetadata, loadCSS, toClassName } from '../../scripts/aem.js';
import { dispatchCustomEvent } from '../../scripts/custom-events.js';

/*
 * Product detail page block with all product data authored on the page,
 * so no GraphQL calls are needed. Renders the same markup as the
 * product-detail block and reuses its styles.
 *
 * Rows (first cell is the key):
 *   image | category | name | price | description
 *   related     - list of links to other product pages ("You may also like")
 *   relatedproductstitle, productvieweventtype, addtocarteventtype,
 *   addtowishlisteventtype, showaddtocartbutton, showaddtowishlistbutton
 * The product id comes from the page metadata (productId).
 */

const MAX_RECOMMENDATIONS = 5;

function readRows(block) {
  const rows = {};
  [...block.children].forEach((row) => {
    const [keyCell, valueCell] = row.children;
    if (!keyCell || !valueCell) return;
    const key = toClassName(keyCell.textContent).replace(/-/g, '');
    if (key) rows[key] = valueCell;
  });
  return rows;
}

const text = (cell) => (cell?.textContent || '').trim();
const isFalse = (cell) => text(cell).toLowerCase() === 'false';

function parsePrice(priceText) {
  const value = parseFloat(priceText.replace(/[^0-9.]/g, ''));
  return Number.isFinite(value) ? value : 0;
}

/**
 * Pages may be served under a prefix (e.g. /content/<site>) on author or local
 * preview; resolve a site path such as /en/men-products/x against it.
 */
function resolveSitePath(path) {
  const [, firstSegment] = path.split('/');
  const current = window.location.pathname;
  const index = firstSegment ? current.indexOf(`/${firstSegment}/`) : -1;
  return index > 0 ? `${current.slice(0, index)}${path}` : path;
}

function buildActions(product, eventConfig, rows) {
  const actions = document.createElement('div');
  actions.className = 'pd-actions';

  if (!isFalse(rows.showaddtocartbutton)) {
    const addToCartBtn = document.createElement('button');
    addToCartBtn.className = 'pd-btn pd-btn-primary';
    addToCartBtn.textContent = 'Add to Cart';
    addToCartBtn.setAttribute('aria-label', `Add ${product.name} to cart`);
    addToCartBtn.addEventListener('click', () => {
      window.addToCart?.({ ...product, quantity: 1 });
      if (eventConfig.addToCart) dispatchCustomEvent(eventConfig.addToCart);
      addToCartBtn.textContent = 'Added to Cart ✓';
      setTimeout(() => { addToCartBtn.textContent = 'Add to Cart'; }, 2000);
    });
    actions.append(addToCartBtn);
  }

  if (!isFalse(rows.showaddtowishlistbutton)) {
    const addToWishlistBtn = document.createElement('button');
    addToWishlistBtn.className = 'pd-btn pd-btn-secondary';
    addToWishlistBtn.textContent = 'Add to Wishlist';
    addToWishlistBtn.setAttribute('aria-label', `Add ${product.name} to wishlist`);
    addToWishlistBtn.addEventListener('click', () => {
      if (eventConfig.addToWishlist) dispatchCustomEvent(eventConfig.addToWishlist);
    });
    actions.append(addToWishlistBtn);
  }

  return actions;
}

function buildRecommendationCard(link) {
  const href = resolveSitePath(link.getAttribute('href'));

  const card = document.createElement('article');
  card.className = 'pd-rec-card';
  card.style.cursor = 'pointer';
  card.addEventListener('click', () => { window.location.href = href; });

  const media = document.createElement('div');
  media.className = 'pd-rec-card-media';

  const meta = document.createElement('div');
  meta.className = 'pd-rec-card-meta';
  const category = document.createElement('p');
  category.className = 'pd-rec-card-category';
  const title = document.createElement('h3');
  title.className = 'pd-rec-card-title';
  title.textContent = link.textContent.trim();
  meta.append(category, title);

  card.append(media, meta);

  // Image and category come from the linked product page itself
  fetch(`${href}.plain.html`)
    .then((resp) => (resp.ok ? resp.text() : ''))
    .then((html) => {
      if (!html) return;
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const linked = doc.querySelector('.product-detail-static');
      if (!linked) return;
      const linkedRows = readRows(linked);
      const picture = linkedRows.image?.querySelector('picture, img');
      if (picture) {
        const img = picture.tagName === 'IMG' ? picture : picture.querySelector('img');
        // .plain.html image URLs are relative to the linked page
        picture.querySelectorAll('[src], [srcset]').forEach((el) => {
          if (el.hasAttribute('src')) el.src = new URL(el.getAttribute('src'), new URL(href, window.location.href)).href;
          if (el.hasAttribute('srcset')) {
            el.srcset = el.getAttribute('srcset').split(',').map((part) => {
              const [url, size] = part.trim().split(/\s+/);
              return `${new URL(url, new URL(href, window.location.href)).href}${size ? ` ${size}` : ''}`;
            }).join(', ');
          }
        });
        if (img) {
          img.loading = 'lazy';
          img.alt = title.textContent;
        }
        media.append(picture);
      }
      category.textContent = text(linkedRows.category);
      if (text(linkedRows.name)) title.textContent = text(linkedRows.name);
    })
    .catch(() => { /* card keeps its name-only fallback */ });

  return card;
}

function buildRecommendations(rows) {
  const links = [...(rows.related?.querySelectorAll('a[href]') || [])].slice(0, MAX_RECOMMENDATIONS);
  if (!links.length) return null;

  const section = document.createElement('div');
  section.className = 'pd-recommendations';

  const title = document.createElement('h2');
  title.className = 'pd-rec-title';
  title.textContent = text(rows.relatedproductstitle) || 'YOU MAY ALSO LIKE';

  const grid = document.createElement('div');
  grid.className = 'pd-rec-grid';
  grid.append(...links.map(buildRecommendationCard));

  section.append(title, grid);
  return section;
}

export default async function decorate(block) {
  loadCSS(`${window.hlx.codeBasePath}/blocks/product-detail/product-detail.css`);
  // product-detail styles are scoped to .product-detail
  block.classList.add('product-detail');

  const rows = readRows(block);
  const eventConfig = {
    productView: text(rows.productvieweventtype),
    addToCart: text(rows.addtocarteventtype),
    addToWishlist: text(rows.addtowishlisteventtype),
  };

  const name = text(rows.name);
  const categoryText = text(rows.category);
  const priceText = text(rows.price);
  const descriptionHtml = rows.description?.innerHTML.trim() || '';
  const picture = rows.image?.querySelector('picture');
  const img = picture?.querySelector('img');
  const imageUrl = img?.currentSrc || img?.src || '';
  const productId = getMetadata('productid');

  const product = {
    id: productId,
    sku: productId,
    name,
    price: parsePrice(priceText),
    category: categoryText,
    description: descriptionHtml,
    image: imageUrl,
    thumbnail: imageUrl,
  };

  if (typeof window.updateDataLayer === 'function') {
    window.updateDataLayer({ product });
  }

  const container = document.createElement('div');
  container.className = 'pd-container';

  const imageSection = document.createElement('div');
  imageSection.className = 'pd-image';
  if (picture) {
    img.alt = img.alt || name;
    img.loading = 'eager';
    img.setAttribute('fetchpriority', 'high');
    imageSection.append(picture);
  }

  const content = document.createElement('div');
  content.className = 'pd-content';

  if (categoryText) {
    const categoryEl = document.createElement('p');
    categoryEl.className = 'pd-category';
    categoryEl.textContent = categoryText;
    content.append(categoryEl);
  }

  const nameEl = document.createElement('h1');
  nameEl.className = 'pd-name';
  nameEl.textContent = name;
  content.append(nameEl);

  if (priceText) {
    const priceEl = document.createElement('p');
    priceEl.className = 'pd-price';
    priceEl.textContent = priceText.startsWith('$') ? priceText : `$${priceText}`;
    content.append(priceEl);
  }

  if (descriptionHtml) {
    const descEl = document.createElement('div');
    descEl.className = 'pd-description';
    descEl.append(...rows.description.childNodes);
    content.append(descEl);
  }

  const actions = buildActions(product, eventConfig, rows);
  if (actions.children.length) content.append(actions);

  container.append(imageSection, content);

  const recommendations = buildRecommendations(rows);
  block.replaceChildren(container, ...(recommendations ? [recommendations] : []));

  if (eventConfig.productView) dispatchCustomEvent(eventConfig.productView);
}
