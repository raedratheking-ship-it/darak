/* ============================================================
   DARAK — الهيدر، القائمة، الفوتر، القائمة الجوال
   ============================================================ */

(function () {
  const page = document.body.dataset.page || "home";
  const isHome = page === "home";

  const NAV_ITEMS = [
    { key: "home", label: "الرئيسية", href: "index.html" },
    { key: "properties", label: "العقارات", href: "properties.html" },
    { key: "sell", label: "بيع عقارك", href: "sell-property.html" },
    { key: "about", label: "من نحن", href: "about.html" },
    { key: "contact", label: "تواصل معنا", href: "contact.html" }
  ];

  /* ---------- الهيدر ---------- */
  function buildHeader() {
    const header = document.getElementById("site-header");
    if (!header) return;

    const links = NAV_ITEMS.map(item => `
      <li>
        <a class="nav-link ${item.key === page ? "is-active" : ""}"
           href="${item.href}" ${item.key === page ? 'aria-current="page"' : ""}>${item.label}</a>
      </li>`).join("");

    header.className = "site-header " + (isHome ? "is-transparent" : "is-solid");
    header.innerHTML = `
      <div class="header-inner">
        <a class="brand" href="index.html" aria-label="دارك — الصفحة الرئيسية">
          <span class="brand-mark">D</span>
          <span class="brand-text"><strong>DARAK</strong><small>دارك العقارية</small></span>
        </a>

        <nav class="main-nav" id="main-nav" aria-label="القائمة الرئيسية">
          <ul class="nav-list">
            ${links}
            <li class="mobile-only"><a class="nav-link" href="#" data-demo="login">تسجيل الدخول</a></li>
            <li class="mobile-only"><a class="btn btn-primary btn-block" href="sell-property.html">اعرض عقارك</a></li>
          </ul>
        </nav>

        <div class="header-actions">
          <a class="icon-btn fav-link" href="properties.html?favorites=1" aria-label="المفضلة">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/></svg>
            <span class="fav-count">0</span>
          </a>
          <button class="btn btn-ghost login-btn" type="button" data-demo="login">تسجيل الدخول</button>
          <a class="btn btn-primary header-cta" href="sell-property.html">اعرض عقارك</a>
          <button class="menu-toggle" id="menu-toggle" type="button"
                  aria-label="فتح القائمة" aria-expanded="false" aria-controls="main-nav">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>`;
  }

  /* ---------- الفوتر ---------- */
  function buildFooter() {
    const footer = document.getElementById("site-footer");
    if (!footer) return;
    const year = new Date().getFullYear();

    footer.innerHTML = `
      <div class="container footer-grid">
        <div class="footer-brand">
          <a class="brand" href="index.html">
            <span class="brand-mark">D</span>
            <span class="brand-text"><strong>DARAK</strong><small>دارك العقارية</small></span>
          </a>
          <p class="footer-desc">منصة عقارية سعودية متخصصة في بيع وتأجير العقارات، نقدم تجربة بحث هادئة وواضحة للباحثين عن منزل أو استثمار.</p>
          <div class="social-row">
            <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="إنستغرام">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
            </a>
            <a href="https://x.com" target="_blank" rel="noopener" aria-label="إكس">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M17.5 3h3.2l-7 8 8.2 10h-6.4l-5-6.1L4.7 21H1.5l7.5-8.6L1.2 3h6.5l4.5 5.6L17.5 3Z"/></svg>
            </a>
            <a href="https://wa.me/966501234567" target="_blank" rel="noopener" aria-label="واتساب">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm5.6 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.1.1-1.8-.1-1.2-.4-3-1.4-4.3-3.4-1-1.5-1.2-2.6-1.2-3.2 0-.6.4-1.3.8-1.6.2-.2.4-.3.6-.3h.4c.2 0 .4 0 .5.4l.7 1.7c.1.2 0 .4-.1.5l-.4.5c-.1.1-.2.3-.1.5.3.6.8 1.2 1.3 1.6.5.4 1 .6 1.4.8.2.1.4 0 .5-.1l.6-.7c.1-.2.3-.2.5-.1l1.6.8c.2.1.4.2.4.3.1.2.1.7-.1 1.3Z"/></svg>
            </a>
          </div>
        </div>

        <div class="footer-col">
          <h3 class="footer-title">الصفحات</h3>
          <ul class="footer-links">
            <li><a href="index.html">الرئيسية</a></li>
            <li><a href="properties.html">العقارات</a></li>
            <li><a href="sell-property.html">بيع عقارك</a></li>
            <li><a href="about.html">من نحن</a></li>
            <li><a href="contact.html">تواصل معنا</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h3 class="footer-title">العقارات</h3>
          <ul class="footer-links">
            <li><a href="properties.html?type=villa">فلل</a></li>
            <li><a href="properties.html?type=apartment">شقق</a></li>
            <li><a href="properties.html?type=townhouse">تاون هاوس</a></li>
            <li><a href="properties.html?type=land">أراضٍ</a></li>
            <li><a href="properties.html?type=commercial">عقارات تجارية</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h3 class="footer-title">تواصل معنا</h3>
          <ul class="footer-contact">
            <li><span>جدة، المملكة العربية السعودية</span></li>
            <li><a href="tel:+966501234567" dir="ltr">+966 50 123 4567</a></li>
            <li><a href="mailto:hello@darak.sa" dir="ltr">hello@darak.sa</a></li>
          </ul>
        </div>
      </div>

      <div class="container footer-bottom">
        <p>© ${year} دارك DARAK. جميع الحقوق محفوظة.</p>
        <p class="footer-note">صُمم بعناية في المملكة العربية السعودية.</p>
      </div>`;
  }

  /* ---------- سلوك الهيدر ---------- */
  function initHeaderBehaviour() {
    const header = document.getElementById("site-header");
    if (!header) return;

    const onScroll = () => {
      if (window.scrollY > 40) {
        header.classList.add("is-solid");
        header.classList.remove("is-transparent");
      } else if (isHome) {
        header.classList.remove("is-solid");
        header.classList.add("is-transparent");
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- قائمة الجوال ---------- */
  function initMobileMenu() {
    const toggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("main-nav");
    if (!toggle || !nav) return;

    const close = () => {
      nav.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "فتح القائمة");
    };

    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "إغلاق القائمة" : "فتح القائمة");
    });

    nav.addEventListener("click", e => {
      if (e.target.closest("a")) close();
    });

    document.addEventListener("keydown", e => {
      if (e.key === "Escape") close();
    });

    document.addEventListener("click", e => {
      if (!nav.classList.contains("is-open")) return;
      if (nav.contains(e.target) || toggle.contains(e.target)) return;
      close();
    });
  }

  /* ---------- أزرار تجريبية ---------- */
  function initDemoButtons() {
    document.addEventListener("click", e => {
      const btn = e.target.closest("[data-demo='login']");
      if (!btn) return;
      e.preventDefault();
      toast("تسجيل الدخول غير متاح في هذه النسخة التجريبية", "error");
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    buildHeader();
    buildFooter();
    initHeaderBehaviour();
    initMobileMenu();
    initDemoButtons();
    if (typeof Favorites !== "undefined") Favorites.updateBadge();
  });
})();