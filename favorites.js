/* ============================================================
   DARAK — نظام المفضلة (LocalStorage)
   ============================================================ */

const Favorites = (function () {
  const KEY = "darak_favorites";

  function read() {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY));
      return Array.isArray(raw) ? raw.map(Number) : [];
    } catch (e) {
      return [];
    }
  }

  function write(list) {
    try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) { /* تجاهل */ }
  }

  function all() { return read(); }
  function has(id) { return read().includes(Number(id)); }

  function toggle(id) {
    id = Number(id);
    const list = read();
    const index = list.indexOf(id);
    let added;

    if (index > -1) { list.splice(index, 1); added = false; }
    else { list.push(id); added = true; }

    write(list);
    syncButtons();
    updateBadge();
    document.dispatchEvent(new CustomEvent("favorites:changed", { detail: { id, added } }));
    return added;
  }

  function syncButtons() {
    document.querySelectorAll("[data-fav]").forEach(btn => {
      const active = has(btn.dataset.fav);
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", String(active));
      btn.setAttribute("aria-label", active ? "إزالة من المفضلة" : "إضافة إلى المفضلة");
    });
    syncDetailButton();
  }

  function syncDetailButton() {
    const btn = document.getElementById("detail-fav");
    if (!btn) return;
    const id = Number(new URLSearchParams(location.search).get("id")) || 1;
    const active = has(id);
    btn.classList.toggle("is-active", active);
    const label = btn.querySelector("span");
    if (label) label.textContent = active ? "إزالة من المفضلة" : "أضف للمفضلة";
  }

  function updateBadge() {
    const count = read().length;
    document.querySelectorAll(".fav-count").forEach(el => {
      el.textContent = count > 99 ? "99+" : String(count);
      el.classList.toggle("is-visible", count > 0);
    });
  }

  document.addEventListener("click", e => {
    const btn = e.target.closest("[data-fav]");
    if (!btn) return;
    e.preventDefault();
    const added = toggle(btn.dataset.fav);
    toast(added ? "تمت إضافة العقار إلى المفضلة" : "تمت إزالة العقار من المفضلة");
  });

  document.addEventListener("DOMContentLoaded", () => {
    syncButtons();
    updateBadge();
  });

  return { all, has, toggle, updateBadge, syncButtons };
})();