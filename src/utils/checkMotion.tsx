export const checkMotion = (): boolean => {
  return (
    !document.startViewTransition ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
};
