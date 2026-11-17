/* ============================================================
   DARAK — البحث الذكي في الصفحة الرئيسية
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("smart-search");
  if (!form) return;

  const citySelect = document.getElementById("s-city");

  /* تعبئة المدن من البيانات */
  if (citySelect && typeof DARAK_CITIES !== "undefined") {
    DARAK_CITIES.forEach(city => {
      const opt = document.createElement("option");
      opt.value = city;
      opt.textContent = city;
      citySelect.appendChild(opt);
    });
  }

  form.addEventListener("submit", e => {
    e.preventDefault();

    const params = new URLSearchParams();
    const city = document.getElementById("s-city").value;
    const type = document.getElementById("s-type").value;
    const purpose = document.getElementById("s-purpose").value;
    const min = document.getElementById("s-min").value;
    const max = document.getElementById("s-max").value;

    if (city) params.set("city", city);
    if (type) params.set("type", type);
    if (purpose) params.set("purpose", purpose);
    if (min) params.set("minPrice", min);
    if (max) params.set("maxPrice", max);

    const qs = params.toString();
    window.location.href = "properties.html" + (qs ? "?" + qs : "");
  });
});