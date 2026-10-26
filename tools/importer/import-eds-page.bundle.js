/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // tools/importer/import-eds-page.js
  var import_eds_page_exports = {};
  __export(import_eds_page_exports, {
    default: () => import_eds_page_default
  });

  // tools/importer/parsers/eds-block.js
  function parse(element, { document }) {
    const [name, ...variants] = [...element.classList];
    if (!name) return;
    const blockName = variants.length ? `${name} (${variants.join(", ")})` : name;
    const cells = [...element.children].map((row) => {
      const rowCells = [...row.children];
      if (!rowCells.length) return [row.textContent.trim()];
      return rowCells.map((cell) => cell.childNodes.length ? [...cell.childNodes] : "");
    });
    const block = WebImporter.Blocks.createBlock(document, { name: blockName, cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/eds-source.js
  var SKIPPED_META = /* @__PURE__ */ new Set([
    "viewport",
    "published-time",
    "modified-time",
    "content-page-ref",
    "description"
  ]);
  function toSitePath(value, origin) {
    if (!/^https?:\/\//i.test(value)) return value;
    try {
      const u = new URL(value, origin);
      if (u.origin !== origin) return value;
      return `${u.pathname}${u.search}${u.hash}`;
    } catch (e) {
      return value;
    }
  }
  function originalMediaUrl(src, pageUrl) {
    const u = new URL(src, pageUrl);
    if (/\/media_[0-9a-f]+\.\w+$/.test(u.pathname)) {
      return `${u.origin}/${u.pathname.split("/").pop()}`;
    }
    return u.href;
  }
  function cleanupContent(main, document, pageUrl) {
    const { origin } = new URL(pageUrl);
    main.querySelectorAll("picture").forEach((picture) => {
      const img = picture.querySelector("img[src]");
      if (!img) {
        picture.remove();
        return;
      }
      const clean = document.createElement("img");
      clean.src = originalMediaUrl(img.getAttribute("src"), pageUrl);
      clean.alt = img.getAttribute("alt") || "";
      picture.replaceWith(clean);
    });
    main.querySelectorAll("a[href]").forEach((a) => {
      a.setAttribute("href", toSitePath(a.getAttribute("href"), origin));
    });
  }
  function sectionMetadataValue(key, value, origin) {
    if (key === "sec-color") {
      const hex = value.match(/#([0-9a-f]{3,8})$/i);
      return hex ? `#${hex[1]}` : value;
    }
    if (key === "sec-bg-image") return toSitePath(value, origin);
    return value;
  }
  function buildSectionMetadata(section, document, origin) {
    const cells = [];
    const styles = [...section.classList];
    if (styles.length) cells.push(["style", styles.join(", ")]);
    [...section.attributes].filter((attr) => attr.name.startsWith("data-") && attr.value.trim() !== "").forEach((attr) => {
      const key = attr.name.slice("data-".length);
      cells.push([key, sectionMetadataValue(key, attr.value.trim(), origin)]);
    });
    if (!cells.length) return null;
    return WebImporter.Blocks.createBlock(document, { name: "Section Metadata", cells });
  }
  function buildPageMetadata(main, document, pageUrl) {
    var _a, _b, _c, _d;
    const { head } = document;
    const meta = {};
    const title = (_b = (_a = head.querySelector("title")) == null ? void 0 : _a.textContent) == null ? void 0 : _b.trim();
    if (title) meta.Title = title;
    const description = (_c = head.querySelector('meta[name="description"]')) == null ? void 0 : _c.getAttribute("content");
    if (description) meta.Description = description;
    const ogImage = (_d = head.querySelector('meta[property="og:image"]')) == null ? void 0 : _d.getAttribute("content");
    if (ogImage && !new URL(ogImage, pageUrl).pathname.endsWith("/default-meta-image.png")) {
      const imageUrl = originalMediaUrl(ogImage, pageUrl);
      const usedOnPage = [...main.querySelectorAll("img")].some((img) => img.src === imageUrl);
      if (!usedOnPage) {
        const img = document.createElement("img");
        img.src = imageUrl;
        meta.Image = img;
      }
    }
    head.querySelectorAll("meta[name]").forEach((el) => {
      const name = el.getAttribute("name");
      const content = el.getAttribute("content");
      if (!content || SKIPPED_META.has(name) || name.startsWith("twitter:")) return;
      meta[name] = content;
    });
    return WebImporter.Blocks.getMetadataBlock(document, meta);
  }
  function transform(hookName, element, payload) {
    var _a;
    const { document } = payload;
    const pageUrl = ((_a = payload.params) == null ? void 0 : _a.originalURL) || payload.url || document.location.href;
    if (hookName === "beforeTransform") {
      cleanupContent(element, document, pageUrl);
    }
    if (hookName === "afterTransform") {
      const { origin } = new URL(pageUrl);
      const sections = [...element.children].filter((el) => el.tagName === "DIV");
      sections.forEach((section, index) => {
        const sectionMeta = buildSectionMetadata(section, document, origin);
        if (sectionMeta) section.append(sectionMeta);
        if (index > 0) section.before(document.createElement("hr"));
        section.replaceWith(...section.childNodes);
      });
      element.append(buildPageMetadata(element, document, pageUrl));
    }
  }

  // tools/importer/utils/eds-source-loader.js
  function plainUrl(pageUrl) {
    const { origin, pathname } = new URL(pageUrl);
    const path = pathname.replace(/\.html$/, "").replace(/\/$/, "") || "/index";
    return `${origin}${path}.plain.html`;
  }
  function loadSourceDocument(document) {
    return __async(this, null, function* () {
      const url = plainUrl(document.location.href);
      const resp = yield fetch(url, { cache: "no-store" });
      if (!resp.ok) throw new Error(`Failed to load source ${url}: ${resp.status}`);
      document.body.innerHTML = yield resp.text();
    });
  }

  // tools/importer/import-eds-page.js
  var PAGE_TEMPLATE = {
    name: "eds-page",
    description: "Any page of the source Edge Delivery (Crosswalk-authored) site. The source already uses this repository's blocks, so every block is carried over table-for-table from the page's undecorated .plain.html.",
    representativeUrl: "https://main--luma-site-14-08--livedemoservices.aem.live/",
    blocks: [
      {
        name: "eds-block",
        instances: ["body > div > div[class]"]
      }
    ]
  };
  var parsers = { "eds-block": parse };
  var transformers = [transform];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), { template: PAGE_TEMPLATE });
    transformers.forEach((fn) => {
      try {
        fn(hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
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
  var import_eds_page_default = {
    onLoad: (_0) => __async(null, [_0], function* ({ document }) {
      yield loadSourceDocument(document);
    }),
    transform: (payload) => {
      const { document, url, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      const blockNames = pageBlocks.map((b) => b.element.className);
      pageBlocks.forEach((block) => {
        if (!block.element.parentNode) return;
        const parser = parsers[block.name];
        if (!parser) return;
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      });
      executeTransformers("afterTransform", main, payload);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const rawPath = new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html?$/, "");
      const path = WebImporter.FileUtils.sanitizePath(rawPath === "" ? "/index" : rawPath);
      return [{
        element: main,
        path,
        report: { title: document.title, template: PAGE_TEMPLATE.name, blocks: blockNames }
      }];
    }
  };
  return __toCommonJS(import_eds_page_exports);
})();
