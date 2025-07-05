"use client";
import DashboardInput from "./dashboardInput/DashboardInput";
import NavComp from "./navComp/NavComp";
import ArticleCard from "../shared/articleCard/ArticleCard";
import useDashboardHook from "@/hooks/useDashboardHook";
import useHomeHook from "@/hooks/useHomeHook";
import Loading from "../shared/loading/Loading";
import Button from "../shared/button/Button";
import { useState } from "react";
import TextEditor from "../TextEditor";
const DashboardComp = ({ t, lang }) => {
  const [activeTab, setActiveTab] = useState("add");
  const [data, collectData, handleSubmit, mutation] = useDashboardHook();
  const [articlesData] = useHomeHook();
  if (mutation?.isPending) return <Loading />;
  return (
    <section dir={lang == "ar" ? "rtl" : "ltr"}>
      <div
        className="position-relative container py-3 px-3 mt-5 shadow-sm"
        style={{ maxWidth: "1100px", minHeight: "90vh" }}
      >
        <NavComp
          articlesData={articlesData}
          t={t}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        {activeTab == "add" && (
          <form className="row" onSubmit={handleSubmit}>
            <DashboardInput
              placeholder="meta data title en"
              fn={collectData}
              name="meta_data_title_en"
              value={data?.meta_data_title_en}
              inputDir="ltr"
              type="text"
              classes="col-6"
            />
            <DashboardInput
              placeholder="عنوان الميتا تاج بالعربي"
              fn={collectData}
              name="meta_data_title_ar"
              value={data?.meta_data_title_ar}
              inputDir="rtl"
              type="text"
              classes="col-6"
            />
            <DashboardInput
              placeholder="meta data desc en"
              fn={collectData}
              name="meta_data_desc_en"
              value={data?.meta_data_desc_en}
              inputDir="ltr"
              type="text"
              classes="col-6"
            />
            <DashboardInput
              placeholder="وصف الميتا تاج بالعربي"
              fn={collectData}
              name="meta_data_desc_ar"
              value={data?.meta_data_desc_ar}
              inputDir="rtl"
              type="text"
              classes="col-6"
            />
            <DashboardInput
              placeholder="meta data keywords en"
              fn={collectData}
              name="meta_data_keywords_en"
              value={data?.meta_data_keywords_en}
              inputDir="ltr"
              type="text"
              classes="col-6"
            />
            <DashboardInput
              placeholder="الكلمات المفتاحية للميتا تاج بالعربي"
              fn={collectData}
              name="meta_data_keywords_ar"
              value={data?.meta_data_keywords_ar}
              inputDir="rtl"
              type="text"
              classes="col-6"
            />
            <DashboardInput
              placeholder="meta data image url"
              fn={collectData}
              name="meta_data_image_url"
              value={data?.meta_data_image_url}
              type="url"
              classes="col-6"
            />
            <DashboardInput
              placeholder="meta data url"
              fn={collectData}
              name="meta_data_url"
              value={data?.meta_data_url}
              type="text"
              classes="col-6"
            />
            <TextEditor
              fn={collectData}
              value={data?.article_data_en}
              name="article_data_en"
              type="en"
              placeholder="Write your content here..."
            />
            <TextEditor
              fn={collectData}
              value={data?.article_data_ar}
              name="article_data_ar"
              type="ar"
              placeholder="أدخل محتوي المقال بالعربي..."
            />

            <div className="col-6">
              <Button text={t.submit} type="submit" />
            </div>
            <div className="col-6">
              <Button text={t.preview} />
            </div>
          </form>
        )}

        {activeTab == "edit" && articlesData && articlesData?.length > 0 && (
          <div className="row g-2 m-0">
            {articlesData?.map((article) => (
              <ArticleCard
                key={article?.id}
                article={article}
                t={t}
                lang={lang}
                type="dashboard"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default DashboardComp;
