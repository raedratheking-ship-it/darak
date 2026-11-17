/* ============================================================
   DARAK — الأدوات المشتركة والمكوّنات القابلة لإعادة الاستخدام
   ============================================================ */

const CURRENCY = "ريال";

const TYPE_LABELS = {
  villa: "فيلا",
  apartment: "شقة",
  townhouse: "تاون هاوس",
  land: "أرض",
  commercial: "عقار تجاري"
};

const PURPOSE_LABELS = {
  sale: "للبيع",
  rent: "للإيجار"
};

/* ---------- الأيقونات ---------- */
const ICONS = {
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
  bed: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"/><path d="M2 16h20"/><path d="M6 10V7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"/><path d="M12 10V7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"/></svg>',
  bath: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12h18v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3Z"/><path d="M6 12V5.5A2.5 2.5 0 0 1 11 5"/><path d="M6 19v2"/><path d="M18 19v2"/></svg>',
  area: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9V5a1 1 0 0 1 1-1h4"/><path d="M20 15v4a1 1 0 0 1-1 1h-4"/><path d="M15 4h4a1 1 0 0 1 1 1v4"/><path d="M9 20H5a1 1 0 0 1-1-1v-4"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 5 5L20 7"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>'
};

/* ---------- تنسيق ---------- */
function formatNumber(n) {
  return Number(n || 0).toLocaleString("en-US");
}

function priceLabel(p) {
  const base = formatNumber(p.price) + " " + CURRENCY;
  return p.purpose === "rent" ? base + " / سنوياً" : base;
}

function typeLabel(t) { return TYPE_LABELS[t] || t; }
function purposeLabel(p) { return PURPOSE_LABELS[p] || p; }

/* ---------- بطاقة العقار ---------- */
function propertyCard(p) {
  const meta = [];
  if (p.beds > 0) meta.push(`<li>${ICONS.bed}${p.beds} غرف</li>`);
  if (p.baths > 0) meta.push(`<li>${ICONS.bath}${p.baths} حمام</li>`);
  meta.push(`<li>${ICONS.area}${formatNumber(p.area)} م²</li>`);

  return `
  <article class="property-card">
    <a class="property-media" href="property-details.html?id=${p.id}" aria-label="${p.title}">
      <img src="${p.images[0]}" alt="${p.title} — ${p.city}" loading="lazy" width="800" height="600">
      <span class="badge badge-${p.purpose}">${purposeLabel(p.purpose)}</span>
    </a>
    <button class="fav-btn" type="button" data-fav="${p.id}" aria-label="إضافة إلى المفضلة" aria-pressed="false">
      ${ICONS.heart}
    </button>
    <div class="property-body">
      <div>
        <h3 class="property-title"><a href="property-details.html?id=${p.id}">${p.title}</a></h3>
        <p class="property-loc">${ICONS.pin}${p.city} — حي ${p.district}</p>
      </div>
      <p class="property-price">${priceLabel(p)}</p>
      <ul class="property-meta">${meta.join("")}</ul>
      <a class="btn btn-outline btn-block" href="property-details.html?id=${p.id}">عرض التفاصيل</a>
    </div>
  </article>`;
}

function renderCards(container, list) {
  if (!container) return;
  container.innerHTML = list.map(propertyCard).join("");
  if (typeof Favorites !== "undefined") Favorites.syncButtons();
}

/* ---------- إشعارات Toast ---------- */
function toast(message, type = "success") {
  let box = document.querySelector(".toast-container");
  if (!box) {
    box = document.createElement("div");
    box.className = "toast-container";
    box.setAttribute("role", "status");
    box.setAttribute("aria-live", "polite");
    document.body.appendChild(box);
  }
  const el = document.createElement("div");
  el.className = "toast " + (type === "error" ? "is-error" : "is-success");
  el.innerHTML = `<span class="toast-ico">${type === "error" ? "!" : ICONS.check}</span><span>${message}</span>`;
  box.appendChild(el);
  setTimeout(() => {
    el.classList.add("is-out");
    setTimeout(() => el.remove(), 400);
  }, 3200);
}

/* ---------- التحقق من النماذج ---------- */
function showFieldError(input, message) {
  const group = input.closest(".form-group");
  if (!group) return;
  group.classList.add("has-error");
  let el = group.querySelector(".field-error");
  if (!el) {
    el = document.createElement("span");
    el.className = "field-error";
    group.appendChild(el);
  }
  el.textContent = message;
  input.setAttribute("aria-invalid", "true");
}

function clearFieldError(input) {
  const group = input.closest(".form-group");
  if (!group) return;
  group.classList.remove("has-error");
  const el = group.querySelector(".field-error");
  if (el) el.remove();
  input.removeAttribute("aria-invalid");
}

function clearFormErrors(form) {
  form.querySelectorAll(".has-error").forEach(g => g.classList.remove("has-error"));
  form.querySelectorAll(".field-error").forEach(e => e.remove());
  form.querySelectorAll("[aria-invalid]").forEach(i => i.removeAttribute("aria-invalid"));
}

function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(v.trim());
}

function isValidSaudiPhone(v) {
  const clean = v.replace(/[\s-]/g, "");
  return /^(?:\+9665|009665|05)\d{8}$/.test(clean);
}

function normalizePhone(v) {
  const clean = v.replace(/[\s-]/g, "");
  if (clean.startsWith("+966")) return clean;
  if (clean.startsWith("00966")) return "+" + clean.slice(2);
  if (clean.startsWith("05")) return "+966" + clean.slice(1);
  return clean;
}

/* ---------- الصفحة الرئيسية: العقارات المميزة ---------- */
function initFeatured() {
  const grid = document.getElementById("featured-grid");
  if (!grid || typeof PROPERTIES === "undefined") return;
  const featured = PROPERTIES.filter(p => p.featured).slice(0, 3);
  renderCards(grid, featured);
}

/* ---------- عدّادات التصنيفات ---------- */
function initCategoryCounts() {
  if (typeof PROPERTIES === "undefined") return;
  document.querySelectorAll("[data-cat-count]").forEach(el => {
    const type = el.dataset.catCount;
    const count = PROPERTIES.filter(p => p.type === type).length;
    el.textContent = count + " عقار";
  });
}

/* ---------- النشرة البريدية ---------- */
function initNewsletter() {
  const form = document.getElementById("newsletter-form");
  if (!form) return;
  form.addEventListener("submit", e => {
    e.preventDefault();
    const input = form.querySelector("input[type=email]");
    if (!isValidEmail(input.value)) {
      toast("يرجى إدخال بريد إلكتروني صحيح", "error");
      input.focus();
      return;
    }
    toast("تم اشتراكك في نشرة دارك بنجاح");
    form.reset();
  });
}

/* ---------- زر العودة للأعلى ---------- */
function initBackToTop() {
  const btn = document.createElement("button");
  btn.className = "to-top";
  btn.type = "button";
  btn.setAttribute("aria-label", "العودة إلى أعلى الصفحة");
  btn.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>';
  document.body.appendChild(btn);

  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  window.addEventListener("scroll", () => {
    btn.classList.toggle("is-visible", window.scrollY > 600);
  }, { passive: true });
}

/* ---------- ظهور العناصر عند التمرير ---------- */
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach(i => i.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  items.forEach((item, i) => {
    item.style.setProperty("--d", item.style.getPropertyValue("--d") || i % 4);
    io.observe(item);
  });
}

/* ---------- التهيئة ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initFeatured();
  initCategoryCounts();
  initNewsletter();
  initBackToTop();
  initReveal();
});