"use client";

import { FiSun, FiMoon } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const switchTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleTheme = () => {
    //@ts-ignore
    if (!document.startViewTransition) {
      switchTheme();
    } else {
      //@ts-ignore
      document.startViewTransition(switchTheme);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="h-9 w-9 inline-flex items-center justify-center rounded-lg text-ink-secondary hover:text-ink-primary hover:bg-surface-2 transition-colors"
    >
      {mounted ? (
        theme === "dark" ? (
          <FiSun size={18} />
        ) : (
          <FiMoon size={18} />
        )
      ) : (
        <span className="h-[18px] w-[18px]" />
      )}
    </button>
  );
}
