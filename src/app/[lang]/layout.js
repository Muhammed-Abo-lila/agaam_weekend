// import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import ReactQueryContext from "@/context/ReactQueryContext";
<link href="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css" rel="stylesheet" />

// const ibmArabic = IBM_Plex_Sans_Arabic({
//   weight: ["100", "200", "300", "400", "500", "600", "700"],
//   variable: "--font-ibm-arabic",
//   subsets: ["latin", "arabic"],
// });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <body className={`${ibmArabic.variable}`}> */}
      <body>
        <ReactQueryContext>{children}</ReactQueryContext>
        <script src="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.js"></script>
      </body>
    </html>
  );
}
