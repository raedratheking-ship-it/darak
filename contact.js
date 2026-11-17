/* ============================================================
   DARAK — نموذج التواصل
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const success = document.getElementById("contact-success");
  const againBtn = document.getElementById("contact-again");

  function validate() {
    clearFormErrors(form);
    let valid = true;

    const name = form.querySelector("#c-name");
    const email = form.querySelector("#c-email");
    const phone = form.querySelector("#c-phone");
    const subject = form.querySelector("#c-subject");
    const message = form.querySelector("#c-message");

    if (name.value.trim().length < 3) {
      showFieldError(name, "يرجى إدخال الاسم (3 أحرف على الأقل)");
      valid = false;
    }
    if (!isValidEmail(email.value)) {
      showFieldError(email, "يرجى إدخال بريد إلكتروني صحيح");
      valid = false;
    }
    if (!isValidSaudiPhone(phone.value)) {
      showFieldError(phone, "يرجى إدخال رقم جوال سعودي صحيح");
      valid = false;
    }
    if (!subject.value) {
      showFieldError(subject, "يرجى اختيار موضوع الرسالة");
      valid = false;
    }
    if (message.value.trim().length < 10) {
      showFieldError(message, "الرسالة يجب أن تكون 10 أحرف على الأقل");
      valid = false;
    }

    return valid;
  }

  form.addEventListener("submit", e => {
    e.preventDefault();

    if (!validate()) {
      toast("يرجى تصحيح الحقول المطلوبة", "error");
      const firstError = form.querySelector(".has-error input, .has-error select, .has-error textarea");
      if (firstError) firstError.focus();
      return;
    }

    const payload = {
      name: form.querySelector("#c-name").value.trim(),
      email: form.querySelector("#c-email").value.trim(),
      phone: normalizePhone(form.querySelector("#c-phone").value),
      subject: form.querySelector("#c-subject").value,
      message: form.querySelector("#c-message").value.trim(),
      submittedAt: new Date().toISOString()
    };

    try {
      const stored = JSON.parse(localStorage.getItem("darak_messages") || "[]");
      stored.push(payload);
      localStorage.setItem("darak_messages", JSON.stringify(stored));
    } catch (err) { /* تجاهل */ }

    form.hidden = true;
    success.hidden = false;
    toast("تم إرسال رسالتك بنجاح");
    success.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  form.querySelectorAll("input, select, textarea").forEach(input => {
    input.addEventListener("input", () => clearFieldError(input));
    input.addEventListener("change", () => clearFieldError(input));
  });

  if (againBtn) {
    againBtn.addEventListener("click", () => {
      form.reset();
      clearFormErrors(form);
      success.hidden = true;
      form.hidden = false;
      form.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
});