"use client";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import ThemeToggle from "../ThemeToggle";
import ChangeLangComp from "./navBarAtoms/ChangeLangComp";
import logoArWhite from "../../../assets/logoArWhite.png";
import logoArBlack from "../../../assets/logoArBlack.png";
import logoEnWhite from "../../../assets/logoEnWhite.png";
import logoEnBlack from "../../../assets/logoEnBlack.png";
const NavBar = ({ lang }) => {
  const pathname = usePathname();
  const isSingleArticle = pathname.includes("/article");
  const { theme } = useTheme();
  const logoSrc = useMemo(() => {
    const isArabic = lang === "ar";
    const isDark = theme === "dark";
    if (isArabic) {
      return isDark ? logoArWhite : logoArBlack;
    } else {
      return isDark ? logoEnWhite : logoEnBlack;
    }
  }, [lang, theme]);
  const containerMaxWidth = isSingleArticle
    ? "var(--single-article-max-width)"
    : "var(--section-max-width)";
  return (
    <div
      className="container-lg py-2"
      style={{ maxWidth: containerMaxWidth }}
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <header className="d-flex justify-content-between align-items-center border-1 mb-3 pb-2 border-dashed ">
        <Link href={`/${lang}`} className="text-decoration-none">
          <h1 className="d-flex align-items-center gap-2 fs-4 mb-0">
            <Image
              src={logoSrc}
              alt={`Argaam Logo ${lang === "ar" ? "Arabic" : "English"}`}
              width={200}
              height={40}
              className="argaam-main-logo"
              style={{
                backgroundColor: "transparent",
              }}
              priority
            />
          </h1>
        </Link>
        <div className="d-flex gap-4 align-items-center">
          <ChangeLangComp lang={lang} />
          <span style={{ cursor: "pointer" }}>
            <ThemeToggle />
          </span>
        </div>
      </header>
    </div>
  );
};
export default NavBar;
