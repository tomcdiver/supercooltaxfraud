// Mark the link for the page currently being viewed.
(() => {
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
})();
