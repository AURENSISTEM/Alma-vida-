(() => {
  "use strict";
  const WHATSAPP = "573008294273";
  const INSTAGRAM = "https://www.instagram.com/accesorios_almavida/";
  const CATEGORIES = ["Cadenas","Ear cuffs","Chokers","Pulseras","Sets","Tobilleras","Aretes","Descuentos"];
  const products = Array.isArray(window.ALMA_VIDA_PRODUCTOS) ? window.ALMA_VIDA_PRODUCTOS : [];
  const params = new URLSearchParams(window.location.search);
  const requestedCategory = params.get("categoria");
  let activeCategory = CATEGORIES.includes(requestedCategory) ? requestedCategory : "Todas";
  let query = "";

  const grid = document.getElementById("productGrid");
  const empty = document.getElementById("emptyState");
  const status = document.getElementById("catalogStatus");
  const search = document.getElementById("searchInput");
  const clear = document.getElementById("clearSearch");
  const tabs = document.getElementById("categoryTabs");
  const wa = (message) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;

  function categoryMatches(product) {
    if (activeCategory === "Todas") return true;
    if (activeCategory === "Descuentos") return product.discount === true || product.category === "Descuentos";
    return product.category === activeCategory;
  }

  function filteredProducts() {
    const q = query.trim().toLocaleLowerCase("es");
    return products.filter(p => {
      const haystack = `${p.name || ""} ${p.description || ""} ${p.category || ""}`.toLocaleLowerCase("es");
      return categoryMatches(p) && (!q || haystack.includes(q));
    });
  }

  function productCard(p) {
    const isDiscount = p.discount === true || p.category === "Descuentos";
    const image = p.image
      ? `<img src="${escapeHTML(p.image)}" alt="${escapeHTML(p.name || "Accesorio")}" loading="lazy">`
      : `<div class="product-placeholder" aria-label="Fotografía pendiente">✧</div>`;
    const price = p.price ? `<p class="product-price">${p.oldPrice ? `<del>${escapeHTML(p.oldPrice)}</del>` : ""}${escapeHTML(p.price)}</p>` : "";
    const desc = p.description ? `<p class="product-description">${escapeHTML(p.description)}</p>` : "";
    const message = `Hola Alma & Vida 🌸 Me interesa ${p.name || "este accesorio"}${p.category ? ` de la categoría ${p.category}` : ""}. ¿Me pueden dar más información?`;
    return `<article class="product-card">
      <div class="product-image">${isDiscount ? '<span class="discount-tag">En descuento</span>' : ""}${image}</div>
      <div class="product-info">
        <span class="product-category">${escapeHTML(p.category || "Accesorios")}</span>
        <h3 class="product-name">${escapeHTML(p.name || "Accesorio")}</h3>
        ${desc}${price}
        <a class="product-cta" href="${wa(message)}" target="_blank" rel="noopener">Consultar por WhatsApp ↗</a>
      </div>
    </article>`;
  }

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, c => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
    }[c]));
  }

  function render() {
    const list = filteredProducts();
    grid.innerHTML = list.map(productCard).join("");
    const hasProducts = list.length > 0;
    empty.hidden = hasProducts;
    grid.hidden = !hasProducts;
    if (products.length === 0) {
      status.textContent = activeCategory === "Todas"
        ? "Catálogo en preparación · pronto encontrarás nuestras piezas aquí."
        : `Colección ${activeCategory} · estamos preparando las fotografías y productos.`;
    } else {
      status.textContent = `${list.length} ${list.length === 1 ? "producto encontrado" : "productos encontrados"}`;
    }
    if (products.length > 0 && !hasProducts) {
      empty.querySelector("h3").textContent = "No encontramos resultados.";
      empty.querySelector("p:not(.eyebrow)").textContent = "Prueba con otra búsqueda o selecciona una categoría diferente.";
    } else {
      empty.querySelector("h3").textContent = "Estamos preparando algo especial.";
      empty.querySelector("p:not(.eyebrow)").textContent = "Pronto encontrarás aquí nuestras piezas. Mientras tanto, escríbenos y te compartimos los accesorios disponibles.";
    }
  }


  search.addEventListener("input", () => {
    query = search.value;
    clear.hidden = !query;
    render();
  });
  clear.addEventListener("click", () => {
    search.value = "";
    query = "";
    clear.hidden = true;
    search.focus();
    render();
  });

  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");
  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
  }));

  document.getElementById("emptyWhatsApp").href = wa("Hola Alma & Vida 🌸 Quisiera conocer los accesorios disponibles.");
  document.getElementById("year").textContent = new Date().getFullYear();
  render();
})();