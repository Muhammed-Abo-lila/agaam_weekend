"use client"
import { usePathname } from "next/navigation";
import ThemeToggle from "../ThemeToggle";
import ChangeLangComp from "./navBarAtoms/ChangeLangComp";
import Link from "next/link";
const NavBar = ({ lang,t }) => {
  const pathName=usePathname();
  const isSingleArticle=pathName.includes("/article")
  return (
    <div
      className="container-lg py-2"
      style={{ maxWidth:isSingleArticle?"var(--single-article-max-width)": "var(--section-max-width)" }}
      dir={lang == "ar" ? "rtl" : "ltr"}
    >
      <div
        className="header d-flex justify-content-between align-items-center  border-1 mb-3 pb-2"
        style={{
          borderBottomStyle: "dotted",
          borderColor: "var(--black-color)",
        }}
      >
        <Link href={`/${lang}`} className="text-decoration-none">
          <h1 className="title d-flex gap-2 fs-4">
            <span style={{ color: "var(--identity-color)" }}>{t.argaam}</span>
            <span style={{ color: "var(--black-color)" }}>{t.weekend}</span>
          </h1>
        </Link>
        <div className="d-flex gap-4">
          <ChangeLangComp lang={lang} />
          <span style={{ cursor: "pointer" }}>
            <ThemeToggle />
          </span>
        </div>
      </div>
    </div>
  );
};
export default NavBar;
