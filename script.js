// Shared page behavior: current navigation state, accessible theme toggle, and sticky header.
(() => {
  const root = document.documentElement;

  // Use the dedicated favicon image on every page that loads this shared script.
  const favicon = document.querySelector('link[rel="icon"]');
  if (favicon) {
    favicon.href = "favicon.png";
  } else {
    const iconLink = document.createElement("link");
    iconLink.rel = "icon";
    iconLink.type = "image/png";
    iconLink.href = "favicon.png";
    document.head.append(iconLink);
  }

  const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
  const currentPage = currentPath.split("/").pop() || "index.html";
  const pageName = currentPage.includes(".") ? currentPage : `${currentPage}.html`;

  document.querySelectorAll(".main-nav a[href]").forEach((link) => {
    const linkPath = new URL(link.href, window.location.href).pathname.replace(/\/$/, "") || "/";
    const linkPage = linkPath.split("/").pop() || "index.html";

    if (linkPage === pageName || (currentPath === "/" && linkPage === "index.html")) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  let savedTheme = null;
  try {
    savedTheme = window.localStorage.getItem("rr-theme");
  } catch (_error) {
    // Storage can be unavailable in private browsing; the button still works for this page.
  }

  const applyTheme = (theme) => {
    const isDark = theme === "dark";
    root.dataset.theme = isDark ? "dark" : "light";
    toggle.setAttribute("aria-pressed", String(isDark));
    toggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    toggle.innerHTML = `<span class="theme-icon" aria-hidden="true">${isDark ? "☀" : "☾"}</span><span>${isDark ? "Light mode" : "Dark mode"}</span>`;
    try {
      window.localStorage.setItem("rr-theme", isDark ? "dark" : "light");
    } catch (_error) {
      // Ignore unavailable storage.
    }
  };

  const toggle = document.createElement("button");
  toggle.className = "theme-toggle";
  toggle.type = "button";
  toggle.setAttribute("aria-pressed", "false");
  toggle.addEventListener("click", () => {
    applyTheme(root.dataset.theme === "dark" ? "light" : "dark");
  });

  const nav = document.querySelector(".main-nav");
  if (nav) nav.append(toggle);

  const header = document.querySelector(".site-header");
  if (header) {
    let updateQueued = false;
    const updateStickyState = () => {
      if (updateQueued) return;
      updateQueued = true;
      window.requestAnimationFrame(() => {
        header.classList.toggle("is-scrolled", window.scrollY > 24);
        updateQueued = false;
      });
    };
    window.addEventListener("scroll", updateStickyState, { passive: true });
    updateStickyState();
  }

  applyTheme(savedTheme === "dark" ? "dark" : "light");
})();
