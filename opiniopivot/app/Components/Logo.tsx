"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export function ThemeLogo() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
    setTheme("light");
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <button
      onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
    >
      <h1 className="mt-14 font-bold text-2xl">Opinio</h1>
    </button>
  );
}
