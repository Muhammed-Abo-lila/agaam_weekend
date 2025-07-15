import HomeComp from "@/components/home/HomeComp";
import { getDictionary } from "./dictionaries";
export default async function Home({ params }) {
  const {lang} = await params;  
  const t = await getDictionary(lang);
  return <HomeComp t={t} lang={lang} />;
}
