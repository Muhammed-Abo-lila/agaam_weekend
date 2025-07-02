import DashboardComp from "@/components/dashboard/DashboardComp";
import { getDictionary } from "../dictionaries";
const DashboardPage = async ({ params }) => {
  const lang = await params?.lang;
  const t = await getDictionary(lang);
  return <DashboardComp t={t} lang={lang} />;
};
export default DashboardPage;
