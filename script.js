(() => {
  const root = document.documentElement;
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const themeToggle = document.getElementById("themeToggle");
  const progress = document.getElementById("scrollProgress");
  const year = document.getElementById("year");

  year.textContent = new Date().getFullYear();

  const savedTheme = localStorage.getItem("rupom-theme");
  if (savedTheme === "light") root.classList.add("light");
  updateThemeIcon();

  themeToggle.addEventListener("click", () => {
    root.classList.toggle("light");
    localStorage.setItem("rupom-theme", root.classList.contains("light") ? "light" : "dark");
    updateThemeIcon();
  });

  function updateThemeIcon() {
    themeToggle.textContent = root.classList.contains("light") ? "☀" : "☾";
    themeToggle.setAttribute("aria-label", root.classList.contains("light") ? "Switch to dark theme" : "Switch to light theme");
  }

  menuToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  window.addEventListener("scroll", () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  }, {passive:true});

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});

  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

  const filters = document.querySelectorAll(".filter");
  const cards = document.querySelectorAll(".project-card");
  filters.forEach(filter => {
    filter.addEventListener("click", () => {
      filters.forEach(btn => btn.classList.remove("active"));
      filter.classList.add("active");
      const category = filter.dataset.filter;
      cards.forEach(card => {
        const show = category === "all" || card.dataset.category === category;
        card.style.display = show ? "" : "none";
      });
    });
  });

  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalText = document.getElementById("modalText");
  const modalType = document.getElementById("modalType");
  const modalTags = document.getElementById("modalTags");

  const projects = {
    ecommerce: {
      type: "PRACTICE PROJECT",
      title: "E-Commerce Website",
      text: "A responsive shopping interface created as a practical frontend exercise. It focuses on clean product presentation, responsive layouts and a user-friendly browsing experience.",
      tags: ["HTML", "CSS", "JavaScript"]
    },
    student: {
      type: "PRACTICE PROJECT",
      title: "Student Management System",
      text: "A practice management application concept for organising student information and academic records, using ASP.NET Core, C# and SQL as the technology stack.",
      tags: ["ASP.NET Core", "C#", "SQL"]
    },
    portfolio: {
      type: "PERSONAL PROJECT",
      title: "Personal Portfolio",
      text: "This portfolio website presents my skills, education, development journey and practice work in a responsive, accessible and interactive interface.",
      tags: ["HTML", "CSS", "JavaScript"]
    }
  };

  document.querySelectorAll(".project-link").forEach(button => {
    button.addEventListener("click", () => {
      const project = projects[button.dataset.project];
      if (!project) return;
      modalType.textContent = project.type;
      modalTitle.textContent = project.title;
      modalText.textContent = project.text;
      modalTags.innerHTML = project.tags.map(tag => `<span>${tag}</span>`).join("");
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
    });
  });

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  modal.querySelectorAll("[data-close-modal]").forEach(el => el.addEventListener("click", closeModal));
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
  });
})();
