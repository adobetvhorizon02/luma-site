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

  // tools/importer/import-product-page.js
  var import_product_page_exports = {};
  __export(import_product_page_exports, {
    default: () => import_product_page_default
  });

  // tools/importer/product-catalog.js
  var product_catalog_default = {
    "WSH10": {
      "sku": "WSH10",
      "name": "Ana Running Short",
      "folder": "women-products",
      "path": "/en/women-products/ana-running-short"
    },
    "WJ03": {
      "sku": "WJ03",
      "name": "Augusta Pullover Jacket",
      "folder": "women-products",
      "path": "/en/women-products/augusta-pullover-jacket"
    },
    "WJ08": {
      "sku": "WJ08",
      "name": "Adrienne Trek Jacket",
      "folder": "women-products",
      "path": "/en/women-products/adrienne-trek-jacket"
    },
    "WP04": {
      "sku": "WP04",
      "name": "Cora Parachute Pant",
      "folder": "women-products",
      "path": "/en/women-products/cora-parachute-pant"
    },
    "WP07": {
      "sku": "WP07",
      "name": "Aeon Capri",
      "folder": "women-products",
      "path": "/en/women-products/aeon-capri"
    },
    "WP08": {
      "sku": "WP08",
      "name": "Bardot Capri",
      "folder": "women-products",
      "path": "/en/women-products/bardot-capri"
    },
    "WP09": {
      "sku": "WP09",
      "name": "Carina Basic Capri",
      "folder": "women-products",
      "path": "/en/women-products/carina-basic-capri"
    },
    "WP10": {
      "sku": "WP10",
      "name": "Daria Bikram Pant",
      "folder": "women-products",
      "path": "/en/women-products/daria-bikram-pant"
    },
    "WP12": {
      "sku": "WP12",
      "name": "Deirdre Relaxed-Fit Capri",
      "folder": "women-products",
      "path": "/en/women-products/deirdre-relaxed-fit-capri"
    },
    "WSH04": {
      "sku": "WSH04",
      "name": "Artemis Running Short",
      "folder": "women-products",
      "path": "/en/women-products/artemis-running-short"
    },
    "WSH05": {
      "sku": "WSH05",
      "name": "Bess Yoga Short",
      "folder": "women-products",
      "path": "/en/women-products/bess-yoga-short"
    },
    "WSH06": {
      "sku": "WSH06",
      "name": "Angel Light Running Short",
      "folder": "women-products",
      "path": "/en/women-products/angel-light-running-short"
    },
    "MH07": {
      "sku": "MH07",
      "name": "Hero Hoodie",
      "folder": "men-products",
      "path": "/en/men-products/hero-hoodie"
    },
    "MH13": {
      "sku": "MH13",
      "name": "Marco Lightweight Active Hoodie",
      "folder": "men-products",
      "path": "/en/men-products/marco-lightweight-active-hoodie"
    },
    "MJ09": {
      "sku": "MJ09",
      "name": "Taurus Elements Shell",
      "folder": "men-products",
      "path": "/en/men-products/taurus-elements-shell"
    },
    "MP01": {
      "sku": "MP01",
      "name": "Caesar Warm-Up Pant",
      "folder": "men-products",
      "path": "/en/men-products/caesar-warm-up-pant"
    },
    "MP02": {
      "sku": "MP02",
      "name": "Viktor LumaTech\u2122 Pant",
      "folder": "men-products",
      "path": "/en/men-products/viktor-lumatech-pant"
    },
    "MP04": {
      "sku": "MP04",
      "name": "Supernova Sport Pant",
      "folder": "men-products",
      "path": "/en/men-products/supernova-sport-pant"
    },
    "MP10": {
      "sku": "MP10",
      "name": "Orestes Yoga Pant",
      "folder": "men-products",
      "path": "/en/men-products/orestes-yoga-pant"
    },
    "MP11": {
      "sku": "MP11",
      "name": "Aether Gym Pant",
      "folder": "men-products",
      "path": "/en/men-products/aether-gym-pant"
    },
    "MP12": {
      "sku": "MP12",
      "name": "Cronus Yoga Pant",
      "folder": "men-products",
      "path": "/en/men-products/cronus-yoga-pant"
    },
    "MS01": {
      "sku": "MS01",
      "name": "Aero Daily Fitness Tee",
      "folder": "men-products",
      "path": "/en/men-products/aero-daily-fitness-tee"
    },
    "MSH09": {
      "sku": "MSH09",
      "name": "Troy Yoga Short",
      "folder": "men-products",
      "path": "/en/men-products/troy-yoga-short"
    },
    "MT02": {
      "sku": "MT02",
      "name": "Tristan Endurance Tank",
      "folder": "men-products",
      "path": "/en/men-products/tristan-endurance-tank"
    },
    "24-MG01": {
      "sku": "24-MG01",
      "name": "Endurance Watch",
      "folder": "gear-products",
      "path": "/en/gear-products/endurance-watch"
    },
    "24-MG02": {
      "sku": "24-MG02",
      "name": "Dash Digital Watch",
      "folder": "gear-products",
      "path": "/en/gear-products/dash-digital-watch"
    },
    "24-MG03": {
      "sku": "24-MG03",
      "name": "Summit Watch",
      "folder": "gear-products",
      "path": "/en/gear-products/summit-watch"
    },
    "24-MG05": {
      "sku": "24-MG05",
      "name": "Cruise Dual Analog Watch",
      "folder": "gear-products",
      "path": "/en/gear-products/cruise-dual-analog-watch"
    },
    "24-UG06": {
      "sku": "24-UG06",
      "name": "Affirm Water Bottle",
      "folder": "gear-products",
      "path": "/en/gear-products/affirm-water-bottle"
    },
    "24-WG01": {
      "sku": "24-WG01",
      "name": "Bolo Sport Watch",
      "folder": "gear-products",
      "path": "/en/gear-products/bolo-sport-watch"
    },
    "24-WG02": {
      "sku": "24-WG02",
      "name": "Didi Sport Watch",
      "folder": "gear-products",
      "path": "/en/gear-products/didi-sport-watch"
    },
    "24-WG03": {
      "sku": "24-WG03",
      "name": "Clamber Watch",
      "folder": "gear-products",
      "path": "/en/gear-products/clamber-watch"
    },
    "24-WG09": {
      "sku": "24-WG09",
      "name": "Luma Analog Watch",
      "folder": "gear-products",
      "path": "/en/gear-products/luma-analog-watch"
    },
    "MP03": {
      "sku": "MP03",
      "name": "Geo Insulated Jogging Pant",
      "folder": "yoga-products",
      "path": "/en/yoga-products/geo-insulated-jogging-pant"
    },
    "MP05": {
      "sku": "MP05",
      "name": "Kratos Gym Pant",
      "folder": "yoga-products",
      "path": "/en/yoga-products/kratos-gym-pant"
    },
    "MP07": {
      "sku": "MP07",
      "name": "Thorpe Track Pant",
      "folder": "yoga-products",
      "path": "/en/yoga-products/thorpe-track-pant"
    },
    "MP08": {
      "sku": "MP08",
      "name": "Zeppelin Yoga Pant",
      "folder": "yoga-products",
      "path": "/en/yoga-products/zeppelin-yoga-pant"
    },
    "MP09": {
      "sku": "MP09",
      "name": "Livingston All-Purpose Tight",
      "folder": "yoga-products",
      "path": "/en/yoga-products/livingston-all-purpose-tight"
    },
    "MSH06": {
      "sku": "MSH06",
      "name": "Lono Yoga Short",
      "folder": "yoga-products",
      "path": "/en/yoga-products/lono-yoga-short"
    },
    "WG03": {
      "sku": "WG03",
      "name": "Set of Sprite Yoga Straps",
      "folder": "yoga-products",
      "path": "/en/yoga-products/set-of-sprite-yoga-straps"
    },
    "WG080": {
      "sku": "WG080",
      "name": "Sprite Yoga Companion Kit",
      "folder": "yoga-products",
      "path": "/en/yoga-products/sprite-yoga-companion-kit"
    },
    "WJ01": {
      "sku": "WJ01",
      "name": "Stellar Solar Jacket",
      "folder": "yoga-products",
      "path": "/en/yoga-products/stellar-solar-jacket"
    },
    "WJ04": {
      "sku": "WJ04",
      "name": "Ingrid Running Jacket",
      "folder": "yoga-products",
      "path": "/en/yoga-products/ingrid-running-jacket"
    },
    "WJ10": {
      "sku": "WJ10",
      "name": "Nadia Elements Shell",
      "folder": "yoga-products",
      "path": "/en/yoga-products/nadia-elements-shell"
    },
    "WJ11": {
      "sku": "WJ11",
      "name": "Neve Studio Dance Jacket",
      "folder": "yoga-products",
      "path": "/en/yoga-products/neve-studio-dance-jacket"
    },
    "WP03": {
      "sku": "WP03",
      "name": "Ida Workout Parachute Pant",
      "folder": "yoga-products",
      "path": "/en/yoga-products/ida-workout-parachute-pant"
    },
    "WS06": {
      "sku": "WS06",
      "name": "Elisa EverCool\u2122 Tee",
      "folder": "yoga-products",
      "path": "/en/yoga-products/elisa-evercool-tee"
    },
    "WSH03": {
      "sku": "WSH03",
      "name": "Gwen Drawstring Bike Short",
      "folder": "yoga-products",
      "path": "/en/yoga-products/gwen-drawstring-bike-short"
    },
    "WSH07": {
      "sku": "WSH07",
      "name": "Echo Fit Compression Short",
      "folder": "yoga-products",
      "path": "/en/yoga-products/echo-fit-compression-short"
    }
  };

  // tools/importer/parsers/product-detail-static.js
  var byName = Object.fromEntries(Object.values(product_catalog_default).map((p) => [p.name, p]));
  function originalImage(img, document) {
    const clean = document.createElement("img");
    const src = img.getAttribute("src") || "";
    clean.src = src.split("?")[0];
    clean.alt = img.getAttribute("alt") || "";
    return clean;
  }
  function parse(element, { document }) {
    var _a, _b, _c, _d, _e;
    const container = element.querySelector(".pd-container");
    if (!container) return;
    const cells = [];
    const img = container.querySelector(".pd-image img");
    if (img) cells.push(["image", originalImage(img, document)]);
    const category = (_a = container.querySelector(".pd-category")) == null ? void 0 : _a.textContent.trim();
    if (category) cells.push(["category", category]);
    cells.push(["name", ((_b = container.querySelector(".pd-name")) == null ? void 0 : _b.textContent.trim()) || ""]);
    const price = (_c = container.querySelector(".pd-price")) == null ? void 0 : _c.textContent.trim();
    if (price) cells.push(["price", price]);
    const description = container.querySelector(".pd-description");
    if (description) {
      description.querySelectorAll("[style]").forEach((el) => el.removeAttribute("style"));
      cells.push(["description", [...description.childNodes]]);
    }
    const related = [...element.querySelectorAll(".pd-rec-card-title")].map((title) => byName[title.textContent.trim()]).filter(Boolean);
    if (related.length) {
      const list = document.createElement("ul");
      related.forEach((product) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = product.path;
        a.textContent = product.name;
        li.append(a);
        list.append(li);
      });
      cells.push(["related", list]);
    }
    const relatedTitle = (_d = element.querySelector(".pd-rec-title")) == null ? void 0 : _d.textContent.trim();
    if (relatedTitle && relatedTitle !== "YOU MAY ALSO LIKE") cells.push(["relatedproductstitle", relatedTitle]);
    const blockConfig = ((_e = window.productPageSource) == null ? void 0 : _e.blockConfig) || {};
    ["productvieweventtype", "addtocarteventtype", "addtowishlisteventtype"].forEach((key) => {
      if (blockConfig[key]) cells.push([key, blockConfig[key]]);
    });
    element.replaceWith(WebImporter.Blocks.createBlock(document, { name: "Product Detail Static", cells }));
  }

  // tools/importer/transformers/product-page.js
  function productId(payload) {
    var _a;
    const pageUrl = ((_a = payload.params) == null ? void 0 : _a.originalURL) || payload.url || payload.document.location.href;
    return new URL(pageUrl).searchParams.get("productId") || "";
  }
  function summary(element) {
    var _a;
    const text = ((_a = element == null ? void 0 : element.querySelector("p")) == null ? void 0 : _a.textContent.replace(/\s+/g, " ").trim()) || "";
    if (text.length <= 160) return text;
    return `${text.slice(0, text.lastIndexOf(" ", 157))}...`;
  }
  function transform(hookName, element, payload) {
    var _a, _b, _c;
    const { document } = payload;
    if (hookName === "beforeTransform") {
      const section = (_a = element.querySelector(".product-detail")) == null ? void 0 : _a.closest("main > div");
      [...element.children].forEach((child) => {
        if (child !== section) child.remove();
      });
      section == null ? void 0 : section.querySelectorAll(":scope > div > :not(.product-detail)").forEach((el) => el.remove());
    }
    if (hookName === "afterTransform") {
      const { sectionAttributes = {} } = window.productPageSource || {};
      const sectionCells = Object.entries(sectionAttributes);
      if (sectionCells.length) {
        element.append(WebImporter.Blocks.createBlock(document, { name: "Section Metadata", cells: sectionCells }));
      }
      const block = element.querySelector("table");
      const rows = Object.fromEntries([...(block == null ? void 0 : block.querySelectorAll("tr")) || []].map((tr) => [...tr.children]).filter((tds) => tds.length === 2).map(([key, value]) => [key.textContent.trim(), value]));
      const meta = { Title: ((_b = rows.name) == null ? void 0 : _b.textContent.trim()) || document.title };
      const description = summary(rows.description);
      if (description) meta.Description = description;
      meta.productId = productId(payload);
      const theme = (_c = document.head.querySelector('meta[name="theme"]')) == null ? void 0 : _c.getAttribute("content");
      if (theme) meta.theme = theme;
      element.append(WebImporter.Blocks.getMetadataBlock(document, meta));
    }
  }

  // tools/importer/utils/product-page-loader.js
  var TIMEOUT = 3e4;
  function waitFor(check) {
    return __async(this, null, function* () {
      const start = Date.now();
      while (Date.now() - start < TIMEOUT) {
        if (check()) return true;
        yield new Promise((resolve) => {
          setTimeout(resolve, 250);
        });
      }
      return false;
    });
  }
  function loadProductPage(document) {
    return __async(this, null, function* () {
      var _a, _b;
      const loaded = yield waitFor(() => document.querySelector('.product-detail[data-block-status="loaded"] .pd-container, .product-detail .pd-error'));
      if (!loaded || document.querySelector(".product-detail .pd-error")) {
        throw new Error(`Product did not render: ${((_a = document.querySelector(".product-detail .pd-error")) == null ? void 0 : _a.textContent) || "timeout"}`);
      }
      yield waitFor(() => [...document.querySelectorAll(".pd-rec-card img")].every((img) => img.getAttribute("src")));
      const { origin, pathname } = document.location;
      const resp = yield fetch(`${origin}${pathname.replace(/\/$/, "")}.plain.html`, { cache: "no-store" });
      const source = new DOMParser().parseFromString(yield resp.text(), "text/html");
      const blockConfig = {};
      source.querySelectorAll(".product-detail > div").forEach((row) => {
        const [key, value] = row.children;
        if (key && value && !value.querySelector("a")) blockConfig[key.textContent.trim()] = value.textContent.trim();
      });
      const sectionAttributes = {};
      const section = (_b = source.querySelector(".product-detail")) == null ? void 0 : _b.parentElement;
      [...(section == null ? void 0 : section.attributes) || []].forEach((attr) => {
        if (attr.name.startsWith("data-") && attr.value.trim()) sectionAttributes[attr.name.slice(5)] = attr.value.trim();
      });
      window.productPageSource = { blockConfig, sectionAttributes };
    });
  }

  // tools/importer/import-product-page.js
  var PAGE_TEMPLATE = {
    name: "product-page",
    description: "Product detail page rendered by the source /en/product?productId=<SKU> page. Each product becomes a static page under its listing folder (/en/<category>-products/<product-name>) with a Product Detail Static block and the productId in the page metadata.",
    representativeUrl: "https://main--luma-site-14-08--livedemoservices.aem.live/en/product?productId=MH07",
    blocks: [
      {
        name: "product-detail-static",
        instances: ["main .product-detail.block"]
      }
    ]
  };
  var parsers = { "product-detail-static": parse };
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
  var import_product_page_default = {
    onLoad: (_0) => __async(null, [_0], function* ({ document }) {
      yield loadProductPage(document);
    }),
    transform: (payload) => {
      const { document, url, params } = payload;
      const main = document.querySelector("main");
      const sku = new URL(params.originalURL).searchParams.get("productId");
      const product = product_catalog_default[sku];
      if (!product) throw new Error(`Product ${sku} is not in any listing folder (product-catalog.js)`);
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      const related = [...document.querySelectorAll(".pd-rec-card-title")].map((el) => el.textContent.trim());
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
      return [{
        element: main,
        path: WebImporter.FileUtils.sanitizePath(product.path),
        report: {
          title: product.name,
          template: PAGE_TEMPLATE.name,
          productId: sku,
          blocks: pageBlocks.map((b) => b.name),
          related: related.join(", "),
          relatedUnlinked: related.filter((name) => !Object.values(product_catalog_default).some((p) => p.name === name)).join(", ")
        }
      }];
    }
  };
  return __toCommonJS(import_product_page_exports);
})();
