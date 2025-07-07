"use client";
import { usePathname, useRouter } from "next/navigation";
const ChangeLangComp = ({ lang }) => {
  const router = useRouter();
  const pathname = usePathname();
  const handleLanguageChange = () => {
    const newLang = lang === "ar" ? "en" : "ar";
    const newPath = pathname.replace(`/${lang}`, `/${newLang}`);
    router.push(newPath);
  };
  return (
    <span style={{ cursor: "pointer" }} onClick={handleLanguageChange}>
      {lang == "ar" ? "english" : "العربية"}
    </span>
  );
};
export default ChangeLangComp;
