document.addEventListener("DOMContentLoaded", () => {
  const body = document.documentElement;

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Mobile nav toggle
  const mobileToggle = document.getElementById("mobile-nav-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  const iconMenu = document.getElementById("icon-menu");
  const iconClose = document.getElementById("icon-close");

  if (mobileToggle && mobileNav && iconMenu && iconClose) {
    const toggleNav = () => {
      const isOpen = !mobileNav.classList.contains("hidden");
      if (isOpen) {
        mobileNav.classList.add("hidden");
        iconMenu.classList.remove("hidden");
        iconClose.classList.add("hidden");
      } else {
        mobileNav.classList.remove("hidden");
        iconMenu.classList.add("hidden");
        iconClose.classList.remove("hidden");
      }
    };

    mobileToggle.addEventListener("click", toggleNav);

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (!mobileNav.classList.contains("hidden")) {
          toggleNav();
        }
      });
    });
  }

  // Scroll reveal using IntersectionObserver
  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      },
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add("reveal-visible"));
  }

  // Gallery lightbox
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxClose = document.getElementById("lightbox-close");

  const openLightbox = (src, alt, label) => {
    if (!lightbox || !lightboxImage || !lightboxCaption) return;
    lightboxImage.src = src;
    lightboxImage.alt = alt || label || "";
    lightboxCaption.textContent = label || alt || "";
    lightbox.classList.remove("hidden");
    lightbox.classList.add("flex");
  };

  const closeLightbox = () => {
    if (!lightbox || !lightboxImage) return;
    lightbox.classList.add("hidden");
    lightbox.classList.remove("flex");
    lightboxImage.src = "";
    lightboxImage.alt = "";
  };

  if (lightbox && lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !lightbox.classList.contains("hidden")) {
        closeLightbox();
      }
    });
  }

  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      if (!img) return;
      const label = item.getAttribute("data-label") || "";
      openLightbox(img.src, img.alt, label);
    });
  });

  // Footer year
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = String(new Date().getFullYear());
  }
});

