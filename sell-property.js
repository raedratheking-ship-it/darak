/* ============================================================
   DARAK — نموذج عرض العقار
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("sell-form");
  if (!form) return;

  const success = document.getElementById("sell-success");
  const againBtn = document.getElementById("sell-again");
  const imagesInput = document.getElementById("o-images");
  const imagesHint = document.getElementById("images-hint");

  /* ---------- عدّاد الصور ---------- */
  if (imagesInput) {
    imagesInput.addEventListener("change", () => {
      const count = imagesInput.files.length;
      imagesHint.textContent = count
        ? `تم اختيار ${count} صورة (لن يتم رفعها إلى خادم).`
        : "يمكنك اختيار عدة صور. لن يتم رفعها إلى خادم في هذه النسخة.";
    });
  }

  /* ---------- التحقق ---------- */
  function validate() {
    clearFormErrors(form);
    let valid = true;

    const ownerName = form.querySelector("#o-name");
    const phone = form.querySelector("#o-phone");
    const email = form.querySelector("#o-email");
    const city = form.querySelector("#o-city");
    const district = form.querySelector("#o-district");
    const type = form.querySelector("#o-type");
    const purpose = form.querySelector("#o-purpose");
    const price = form.querySelector("#o-price");
    const area = form.querySelector("#o-area");
    const desc = form.querySelector("#o-desc");

    if (ownerName.value.trim().length < 3) {
      showFieldError(ownerName, "يرجى إدخال اسم المالك (3 أحرف على الأقل)");
      valid = false;
    }
    if (!isValidSaudiPhone(phone.value)) {
      showFieldError(phone, "يرجى إدخال رقم جوال سعودي صحيح مثل 05XXXXXXXX");
      valid = false;
    }
    if (!isValidEmail(email.value)) {
      showFieldError(email, "يرجى إدخال بريد إلكتروني صحيح");
      valid = false;
    }
    if (!city.value) {
      showFieldError(city, "يرجى اختيار المدينة");
      valid = false;
    }
    if (district.value.trim().length < 2) {
      showFieldError(district, "يرجى إدخال اسم الحي");
      valid = false;
    }
    if (!type.value) {
      showFieldError(type, "يرجى اختيار نوع العقار");
      valid = false;
    }
    if (!purpose.value) {
      showFieldError(purpose, "يرجى اختيار الغرض");
      valid = false;
    }
    if (!price.value || Number(price.value) <= 0) {
      showFieldError(price, "يرجى إدخال سعر صحيح");
      valid = false;
    }
    if (!area.value || Number(area.value) <= 0) {
      showFieldError(area, "يرجى إدخال مساحة صحيحة");
      valid = false;
    }
    if (desc.value.trim().length < 20) {
      showFieldError(desc, "الوصف يجب أن يكون 20 حرفاً على الأقل");
      valid = false;
    }

    return valid;
  }

  /* ---------- الإرسال ---------- */
  form.addEventListener("submit", e => {
    e.preventDefault();

    if (!validate()) {
      toast("يرجى تصحيح الحقول المطلوبة", "error");
      const firstError = form.querySelector(".has-error input, .has-error select, .has-error textarea");
      if (firstError) firstError.focus();
      return;
    }

    const data = {
      ownerName: form.querySelector("#o-name").value.trim(),
      phone: normalizePhone(form.querySelector("#o-phone").value),
      email: form.querySelector("#o-email").value.trim(),
      city: form.querySelector("#o-city").value,
      district: form.querySelector("#o-district").value.trim(),
      type: form.querySelector("#o-type").value,
      purpose: form.querySelector("#o-purpose").value,
      price: Number(form.querySelector("#o-price").value),
      area: Number(form.querySelector("#o-area").value),
      beds: Number(form.querySelector("#o-beds").value || 0),
      baths: Number(form.querySelector("#o-baths").value || 0),
      description: form.querySelector("#o-desc").value.trim(),
      imagesCount: imagesInput ? imagesInput.files.length : 0,
      submittedAt: new Date().toISOString()
    };

    try {
      const stored = JSON.parse(localStorage.getItem("darak_listings") || "[]");
      stored.push(data);
      localStorage.setItem("darak_listings", JSON.stringify(stored));
    } catch (err) { /* تجاهل */ }

    form.hidden = true;
    success.hidden = false;
    toast("تم حفظ طلب عرض العقار بنجاح");
    success.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  /* ---------- تنظيف الأخطاء ---------- */
  form.querySelectorAll("input, select, textarea").forEach(input => {
    input.addEventListener("input", () => clearFieldError(input));
    input.addEventListener("change", () => clearFieldError(input));
  });

  /* ---------- إضافة عقار آخر ---------- */
  if (againBtn) {
    againBtn.addEventListener("click", () => {
      form.reset();
      clearFormErrors(form);
      if (imagesHint) imagesHint.textContent = "يمكنك اختيار عدة صور. لن يتم رفعها إلى خادم في هذه النسخة.";
      success.hidden = true;
      form.hidden = false;
      form.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
});