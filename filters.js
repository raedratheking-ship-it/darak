/* ============================================================
   DARAK — صفحة العقارات: التصفية، الترتيب، الترقيم
   ============================================================ */

(function () {
  const grid = document.getElementById("properties-grid");
  if (!grid || typeof PROPERTIES === "undefined") return;

  const PAGE_SIZE = 6;

  const els = {
    city: document.getElementById("f-city"),
    type: document.getElementById("f-type"),
    purpose: document.getElementById("f-purpose"),
    min: document.getElementById("f-min"),
    max: document.getElementById("f-max"),
    beds: document.getElementById("f-beds"),
    baths: document.getElementById("f-baths"),
    area: document.getElementById("f-area"),
    fav: document.getElementById("f-fav"),
    sort: document.getElementById("f-sort"),
    count: document.getElementById("results-count"),
    pagination: document.getElementById("pagination"),
    empty: document.getElementById("empty-state"),
    reset: document.getElementById("filters-reset"),
    openBtn: document.getElementById("filters-open"),
    closeBtn: document.getElementById("filters-close"),
    panel: document.getElementById("filters-panel")
  };

  const state = {
    city: "", type: "", purpose: "",
    minPrice: "", maxPrice: "",
    beds: "", baths: "", minArea: "",
    favoritesOnly: false,
    sort: "newest",
    page: 1
  };

  /* ---------- تعبئة المدن ---------- */
  function fillCities() {
    if (!els.city || typeof DARAK_CITIES === "undefined") return;
    DARAK_CITIES.forEach(city => {
      const opt = document.createElement("option");
      opt.value = city;
      opt.textContent = city;
      els.city.appendChild(opt);
    });
  }

  /* ---------- قراءة معاملات الرابط ---------- */
  function readParams() {
    const p = new URLSearchParams(location.search);
    if (p.get("city")) state.city = p.get("city");
    if (p.get("type")) state.type = p.get("type");
    if (p.get("purpose")) state.purpose = p.get("purpose");
    if (p.get("minPrice")) state.minPrice = p.get("minPrice");
    if (p.get("maxPrice")) state.maxPrice = p.get("maxPrice");
    if (p.get("favorites") === "1") state.favoritesOnly = true;

    if (els.city) els.city.value = state.city;
    if (els.type) els.type.value = state.type;
    if (els.purpose) els.purpose.value = state.purpose;
    if (els.min) els.min.value = state.minPrice;
    if (els.max) els.max.value = state.maxPrice;
    if (els.fav) els.fav.checked = state.favoritesOnly;
  }

  /* ---------- التصفية ---------- */
  function getFiltered() {
    let list = PROPERTIES.slice();

    if (state.city) list = list.filter(p => p.city === state.city);
    if (state.type) list = list.filter(p => p.type === state.type);
    if (state.purpose) list = list.filter(p => p.purpose === state.purpose);
    if (state.minPrice) list = list.filter(p => p.price >= Number(state.minPrice));
    if (state.maxPrice) list = list.filter(p => p.price <= Number(state.maxPrice));
    if (state.beds) list = list.filter(p => p.beds >= Number(state.beds));
    if (state.baths) list = list.filter(p => p.baths >= Number(state.baths));
    if (state.minArea) list = list.filter(p => p.area >= Number(state.minArea));

    if (state.favoritesOnly) {
      const favs = Favorites.all();
      list = list.filter(p => favs.includes(p.id));
    }

    switch (state.sort) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "area-desc": list.sort((a, b) => b.area - a.area); break;
      default: list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return list;
  }

  /* ---------- الترقيم ---------- */
  function renderPagination(total) {
    if (!els.pagination) return;
    const pages = Math.ceil(total / PAGE_SIZE);
    els.pagination.innerHTML = "";

    if (pages <= 1) return;

    const makeBtn = (label, page, opts = {}) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "page-btn" + (opts.active ? " is-active" : "");
      btn.textContent = label;
      if (opts.disabled) btn.disabled = true;
      if (opts.aria) btn.setAttribute("aria-label", opts.aria);
      btn.addEventListener("click", () => {
        state.page = page;
        render();
        grid.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return btn;
    };

    els.pagination.appendChild(makeBtn("›", state.page - 1, { disabled: state.page === 1, aria: "الصفحة السابقة" }));

    for (let i = 1; i <= pages; i++) {
      els.pagination.appendChild(makeBtn(String(i), i, { active: i === state.page }));
    }

    els.pagination.appendChild(makeBtn("‹", state.page + 1, { disabled: state.page === pages, aria: "الصفحة التالية" }));
  }

  /* ---------- الحالة الفارغة ---------- */
  function renderEmpty() {
    if (!els.empty) return;
    els.empty.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">
          <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
        </div>
        <h3>لا توجد عقارات مطابقة</h3>
        <p>جرّب تعديل معايير البحث أو مسح الفلاتر لعرض جميع العقارات المتاحة.</p>
        <button class="btn btn-primary" type="button" id="empty-reset">إعادة تعيين الفلاتر</button>
      </div>`;
    const btn = document.getElementById("empty-reset");
    if (btn) btn.addEventListener("click", resetAll);
  }

  /* ---------- العرض ---------- */
  function render() {
    const list = getFiltered();
    const total = list.length;
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

    if (state.page > totalPages) state.page = totalPages;

    const start = (state.page - 1) * PAGE_SIZE;
    const pageItems = list.slice(start, start + PAGE_SIZE);

    if (els.count) {
      els.count.innerHTML = total === 0
        ? "لا توجد نتائج"
        : `عرض <strong>${pageItems.length}</strong> من <strong>${total}</strong> عقار`;
    }

    if (total === 0) {
      grid.innerHTML = "";
      if (els.empty) renderEmpty();
      if (els.pagination) els.pagination.innerHTML = "";
      return;
    }

    if (els.empty) els.empty.innerHTML = "";
    renderCards(grid, pageItems);
    renderPagination(total);
  }

  /* ---------- إعادة التعيين ---------- */
  function resetAll() {
    state.city = ""; state.type = ""; state.purpose = "";
    state.minPrice = ""; state.maxPrice = "";
    state.beds = ""; state.baths = ""; state.minArea = "";
    state.favoritesOnly = false;
    state.sort = "newest";
    state.page = 1;

    els.city.value = "";
    els.type.value = "";
    els.purpose.value = "";
    els.min.value = "";
    els.max.value = "";
    els.beds.value = "";
    els.baths.value = "";
    els.area.value = "";
    if (els.fav) els.fav.checked = false;
    els.sort.value = "newest";

    history.replaceState(null, "", "properties.html");
    render();
    toast("تم مسح جميع الفلاتر");
  }

  /* ---------- ربط الأحداث ---------- */
  function bind() {
    let timer = null;
    const debounce = (fn) => {
      clearTimeout(timer);
      timer = setTimeout(fn, 250);
    };

    const updateFromInputs = () => {
      state.city = els.city.value;
      state.type = els.type.value;
      state.purpose = els.purpose.value;
      state.minPrice = els.min.value;
      state.maxPrice = els.max.value;
      state.beds = els.beds.value;
      state.baths = els.baths.value;
      state.minArea = els.area.value;
      state.favoritesOnly = els.fav ? els.fav.checked : false;
      state.page = 1;
      render();
    };

    [els.city, els.type, els.purpose, els.beds, els.baths].forEach(el => {
      if (el) el.addEventListener("change", updateFromInputs);
    });

    [els.min, els.max, els.area].forEach(el => {
      if (el) el.addEventListener("input", () => debounce(updateFromInputs));
    });

    if (els.fav) els.fav.addEventListener("change", updateFromInputs);

    if (els.sort) {
      els.sort.addEventListener("change", () => {
        state.sort = els.sort.value;
        state.page = 1;
        render();
      });
    }

    if (els.reset) els.reset.addEventListener("click", resetAll);

    /* لوحة الفلاتر على الجوال */
    if (els.openBtn) els.openBtn.addEventListener("click", () => els.panel.classList.add("is-open"));
    if (els.closeBtn) els.closeBtn.addEventListener("click", () => els.panel.classList.remove("is-open"));

    /* تحديث عند تغيير المفضلة */
    document.addEventListener("favorites:changed", () => {
      if (state.favoritesOnly) render();
    });
  }

  /* ---------- التشغيل ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    fillCities();
    readParams();
    bind();
    render();
  });
})();