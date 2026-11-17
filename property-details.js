/* ============================================================
   DARAK — صفحة تفاصيل العقار
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  if (typeof PROPERTIES === "undefined") return;

  const params = new URLSearchParams(location.search);
  const id = Number(params.get("id")) || 1;
  const property = PROPERTIES.find(p => p.id === id) || PROPERTIES[0];

  let currentImage = 0;
  let lastFocused = null;

  document.title = property.title + " | دارك DARAK";

  /* ---------- المسار ---------- */
  const crumbs = document.getElementById("detail-breadcrumbs");
  if (crumbs) {
    crumbs.innerHTML = `
      <a href="index.html">الرئيسية</a><span>/</span>
      <a href="properties.html">العقارات</a><span>/</span>
      <span aria-current="page">${property.title}</span>`;
  }

  /* ---------- الرأس ---------- */
  const purposeEl = document.getElementById("detail-purpose");
  purposeEl.textContent = purposeLabel(property.purpose);
  purposeEl.className = "pill pill-" + property.purpose;

  document.getElementById("detail-title").textContent = property.title;
  document.getElementById("detail-loc").innerHTML =
    `${ICONS.pin}<span>${property.city} — حي ${property.district}</span>`;
  document.getElementById("detail-price").textContent = priceLabel(property);

  /* ---------- زر المفضلة ---------- */
  const favBtn = document.getElementById("detail-fav");
  favBtn.dataset.fav = String(property.id);
  Favorites.syncButtons();

  /* ---------- المعرض ---------- */
  const mainImg = document.getElementById("gallery-main-img");
  const mainBtn = document.getElementById("gallery-main");
  const thumbs = document.getElementById("gallery-thumbs");
  const counter = document.getElementById("gallery-count");

  function setImage(index) {
    currentImage = (index + property.images.length) % property.images.length;
    mainImg.src = property.images[currentImage];
    mainImg.alt = `${property.title} — صورة ${currentImage + 1}`;
    counter.textContent = `${currentImage + 1} / ${property.images.length}`;
    thumbs.querySelectorAll(".thumb").forEach((t, i) => {
      t.classList.toggle("is-active", i === currentImage);
    });
  }

  thumbs.innerHTML = property.images.map((src, i) => `
    <button class="thumb" type="button" data-index="${i}" aria-label="صورة ${i + 1}">
      <img src="${src}" alt="${property.title} — صورة ${i + 1}" loading="lazy">
    </button>`).join("");

  thumbs.addEventListener("click", e => {
    const btn = e.target.closest(".thumb");
    if (!btn) return;
    setImage(Number(btn.dataset.index));
  });

  mainBtn.addEventListener("click", () => openLightbox(currentImage));
  setImage(0);

  /* ---------- Lightbox ---------- */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  function openLightbox(index) {
    lastFocused = document.activeElement;
    currentImage = index;
    lightboxImg.src = property.images[currentImage];
    lightboxImg.alt = `${property.title} — صورة ${currentImage + 1}`;
    lightbox.hidden = false;
    document.body.classList.add("no-scroll");
    document.getElementById("lightbox-close").focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.classList.remove("no-scroll");
    if (lastFocused) lastFocused.focus();
  }

  function stepLightbox(dir) {
    currentImage = (currentImage + dir + property.images.length) % property.images.length;
    lightboxImg.src = property.images[currentImage];
    lightboxImg.alt = `${property.title} — صورة ${currentImage + 1}`;
    setImage(currentImage);
  }

  document.getElementById("lightbox-close").addEventListener("click", closeLightbox);
  document.getElementById("lightbox-next").addEventListener("click", () => stepLightbox(1));
  document.getElementById("lightbox-prev").addEventListener("click", () => stepLightbox(-1));
  lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });

  document.addEventListener("keydown", e => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") stepLightbox(1);
    if (e.key === "ArrowRight") stepLightbox(-1);
  });

  /* ---------- المواصفات ---------- */
  const specs = [
    { label: "نوع العقار", value: typeLabel(property.type) },
    { label: "الغرض", value: purposeLabel(property.purpose) },
    { label: "المساحة", value: formatNumber(property.area) + " م²" },
    { label: "غرف النوم", value: property.beds > 0 ? property.beds : "—" },
    { label: "الحمامات", value: property.baths > 0 ? property.baths : "—" },
    { label: "المدينة", value: property.city },
    { label: "الحي", value: property.district },
    { label: "تاريخ الإضافة", value: property.createdAt }
  ];

  document.getElementById("spec-grid").innerHTML = specs.map(s => `
    <div class="spec-item">
      <span class="spec-label">${s.label}</span>
      <span class="spec-value">${s.value}</span>
    </div>`).join("");

  /* ---------- الوصف والمميزات ---------- */
  document.getElementById("detail-desc").textContent = property.description;

  document.getElementById("feature-list").innerHTML = property.features.map(f => `
    <li>${ICONS.check}<span>${f}</span></li>`).join("");

  /* ---------- الخريطة ---------- */
  const address = `${property.city} — حي ${property.district}`;
  document.getElementById("map-address").textContent = address;
  document.getElementById("map-link").href =
    "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(address + " السعودية");

  /* ---------- المعلن ---------- */
  const agent = property.agent;
  document.getElementById("agent-avatar").textContent = agent.name.charAt(0);
  document.getElementById("agent-name").textContent = agent.name;
  document.getElementById("agent-role").textContent = agent.role;

  document.getElementById("agent-call").href = "tel:" + agent.phone.replace(/\s/g, "");
  document.getElementById("agent-whatsapp").href =
    "https://wa.me/" + agent.phone.replace(/\D/g, "").replace(/^0+/, "") +
    "?text=" + encodeURIComponent(`مرحباً، أنا مهتم بالعقار: ${property.title} (رقم ${property.id})`);

  /* ---------- نموذج المعاينة ---------- */
  const form = document.getElementById("viewing-form");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      clearFormErrors(form);

      const name = form.querySelector("#v-name");
      const phone = form.querySelector("#v-phone");
      const date = form.querySelector("#v-date");
      let valid = true;

      if (name.value.trim().length < 3) {
        showFieldError(name, "يرجى إدخال الاسم الكامل");
        valid = false;
      }
      if (!isValidSaudiPhone(phone.value)) {
        showFieldError(phone, "يرجى إدخال رقم جوال سعودي صحيح");
        valid = false;
      }
      if (!date.value) {
        showFieldError(date, "يرجى اختيار تاريخ المعاينة");
        valid = false;
      }
      if (!valid) {
        toast("يرجى تصحيح الحقول المطلوبة", "error");
        return;
      }

      toast("تم إرسال طلب المعاينة بنجاح");
      form.reset();
    });

    form.querySelectorAll("input, textarea").forEach(input => {
      input.addEventListener("input", () => clearFieldError(input));
    });
  }

  /* ---------- عقارات مشابهة ---------- */
  const similar = PROPERTIES
    .filter(p => p.id !== property.id && (p.type === property.type || p.city === property.city))
    .slice(0, 3);

  renderCards(document.getElementById("similar-grid"), similar);
});