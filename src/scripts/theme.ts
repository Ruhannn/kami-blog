import { startCircleAnimation } from "@utils/startCircleAnimation";

const THEME_CONFIG = {
  light: {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`,
    nextTheme: "dark" as const,
  },
  dark: {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>`,
    nextTheme: "light" as const,
  },
} as const;

type ThemeType = "light" | "dark";

function init() {
  preloadTheme();
  onScroll();
  animate();
  setupThemeListener();
  setupSystemThemeListener();
  document.addEventListener("scroll", onScroll);
}

function setupThemeListener() {
  const themeButton = document.getElementById("theme-toggle");

  themeButton?.addEventListener("click", (e) => {
    const currentTheme = getCurrentTheme();
    const nextTheme = THEME_CONFIG[currentTheme].nextTheme;

    localStorage.setItem("theme", nextTheme);

    void startCircleAnimation(
      () => applyTheme(nextTheme),
      e.clientX,
      e.clientY,
    );
  });
}

function setupSystemThemeListener() {
  window.matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => {
      const savedTheme = getSavedTheme();
      if (!savedTheme) {
        applyTheme(event.matches ? "dark" : "light");
      }
    });
}

function getCurrentTheme(): ThemeType {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function applyTheme(theme: ThemeType) {
  const isDark = theme === "dark";

  const css = document.createElement("style");
  css.appendChild(
    document.createTextNode(
      `* {
        -webkit-transition: none !important;
        -moz-transition: none !important;
        -o-transition: none !important;
        -ms-transition: none !important;
        transition: none !important;
      }`,
    ),
  );
  document.head.appendChild(css);

  if (isDark) {
    document.documentElement.classList.add("dark");
  }
  else {
    document.documentElement.classList.remove("dark");
  }

  updateThemeButtonEmoji(theme);

  // eslint-disable-next-line ts/no-unused-expressions
  window.getComputedStyle(css).opacity;
  document.head.removeChild(css);
}

function updateThemeButtonEmoji(currentTheme: ThemeType) {
  const themeButton = document.getElementById("theme-toggle");

  if (themeButton) {
    themeButton.innerHTML = THEME_CONFIG[currentTheme].icon;
  }
}

function getSavedTheme(): ThemeType | null {
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") {
    return saved;
  }
  return null;
}

function getSystemTheme(): ThemeType {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function preloadTheme() {
  const savedTheme = getSavedTheme();

  if (savedTheme) {
    // User has a saved preference - use it
    applyTheme(savedTheme);
  }
  else {
    const systemTheme = getSystemTheme();
    applyTheme(systemTheme);
  }
}

function animate() {
  const animateElements = document.querySelectorAll(".animate");
  animateElements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add("show");
    }, index * 150);
  });
}

function onScroll() {
  if (window.scrollY > 0) {
    document.documentElement.classList.add("scrolled");
  }
  else {
    document.documentElement.classList.remove("scrolled");
  }
}

document.addEventListener("DOMContentLoaded", () => init());
document.addEventListener("astro:after-swap", () => init());
preloadTheme();
