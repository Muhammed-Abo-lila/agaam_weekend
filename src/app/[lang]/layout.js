import "./globals.css";
import ReactQueryContext from "@/context/ReactQueryContext";
import { ThemeProvider } from "next-themes";
import NavBar from "@/components/shared/navBar/NavBar";
import { getDictionary } from "./dictionaries";
export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  const t = await getDictionary(lang);
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ReactQueryContext>
        <NavBar lang={lang} t={t} />
        {children}
      </ReactQueryContext>
    </ThemeProvider>
  );
}
