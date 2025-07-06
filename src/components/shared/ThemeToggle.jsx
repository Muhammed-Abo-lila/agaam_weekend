"use client";
import { useTheme } from "next-themes";
import { IoMoon, IoSunnyOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <>
      {theme === "dark" ? (
        <IoMoon onClick={() => setTheme(theme === "dark" ? "light" : "dark")} />
      ) : (
        <IoSunnyOutline
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        />
      )}
    </>
  );
}