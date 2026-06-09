// Testimonial slider
const testimonials = [
  {
    quote: "Я перестал играть роль жертвы и стал увереннее. Это изменило мой доход и отношения.",
    author: "Геннадий Шепелин",
    role: "Выпускник ИЖСИЗ",
    photo: "https://static.tildacdn.com/tild6165-3236-4831-a536-613231653133/jonathan-borba-RTHwe.jpg",
  },
  {
    quote: "Расстановки помогли увидеть корень семейных конфликтов. Наконец появилась ясность и спокойствие.",
    author: "Марина К.",
    role: "Участница группы",
    photo: "https://static.tildacdn.com/tild3465-3034-4232-b531-666636393961/c_1.jpg",
  },
  {
    quote: "Обучение в институте дало не только профессию, но и глубокое понимание себя.",
    author: "Алексей Д.",
    role: "Выпускник базового курса",
    photo: "https://static.tildacdn.com/tild3962-6236-4536-a463-663630633963/8B7A2059_1.png",
  },
];

function initSlider() {
  const slider = document.querySelector("[data-slider]");
  if (!slider) return;

  const quoteEl = slider.querySelector("[data-slider-quote]");
  const authorEl = slider.querySelector("[data-slider-author]");
  const roleEl = slider.querySelector("[data-slider-role]");
  const photoEl = slider.querySelector("[data-slider-photo]");
  const dotsContainer = slider.querySelector("[data-slider-dots]");

  let current = 0;

  function render(index) {
    const t = testimonials[index];
    quoteEl.textContent = `"${t.quote}"`;
    authorEl.textContent = t.author;
    roleEl.textContent = t.role;
    photoEl.src = t.photo;
    photoEl.alt = t.author;

    dotsContainer.querySelectorAll(".dot").forEach((dot, i) => {
      dot.classList.toggle("dot--active", i === index);
    });
  }

  testimonials.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = `dot${i === 0 ? " dot--active" : ""}`;
    dot.setAttribute("aria-label", `Отзыв ${i + 1}`);
    dot.addEventListener("click", () => {
      current = i;
      render(current);
    });
    dotsContainer.appendChild(dot);
  });

  setInterval(() => {
    current = (current + 1) % testimonials.length;
    render(current);
  }, 5000);
}

// FAQ accordion
function initFaq() {
  document.querySelectorAll(".faq-item__question").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const wasOpen = item.classList.contains("faq-item--open");
      document.querySelectorAll(".faq-item").forEach((el) => el.classList.remove("faq-item--open"));
      if (!wasOpen) item.classList.add("faq-item--open");
    });
  });
}

// Wizard demo
function initWizard() {
  document.querySelectorAll(".wizard-option").forEach((opt) => {
    opt.addEventListener("click", () => {
      opt.closest(".wizard-preview__options")
        ?.querySelectorAll(".wizard-option")
        .forEach((o) => o.classList.remove("wizard-option--selected"));
      opt.classList.add("wizard-option--selected");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initSlider();
  initFaq();
  initWizard();
});
