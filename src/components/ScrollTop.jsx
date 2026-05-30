// ScrollTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "lenis/react";

export default function ScrollTop() {
  const { pathname } = useLocation();
  const lenis = useLenis();

  // Disable browser's default scroll restoration to prevent conflicts
  // with lazy loaded components and Lenis smooth scroll
  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);

  return null;
}

