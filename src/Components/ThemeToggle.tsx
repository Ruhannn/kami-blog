import { useRef } from "react";
import { flushSync } from "react-dom";
import { BiMoon, BiSun } from "react-icons/bi";
import { useThemeContext } from "../context/themeContext";

export default function ThemeToggle() {
  const { theme, setTheme } = useThemeContext();
  const ref = useRef<HTMLDivElement>(null);

  const toggleDarkMode = async (newState: boolean) => {
    // Return early if View Transition API is not supported or user prefers reduced motion
    if (
      !ref.current ||
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setTheme(newState ? "dark" : "light");
      return;
    }

    await document.startViewTransition(() => {
      flushSync(() => {
        setTheme(newState ? "dark" : "light");
      });
    }).ready;

    const { top, left, width, height } = ref.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom));

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 500,
        easing: "cubic-bezier(0.99, 1.56,0.64,1)",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  };

  const handleChange = () => {
    toggleDarkMode(theme === "light");
  };

  return (
    <>
      <button key={theme} className="cursor-pointer" onClick={handleChange}>
        {theme === "light" ? <BiMoon /> : <BiSun />}
      </button>
      <div ref={ref} />
    </>
  );
}
