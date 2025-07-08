"use client";
import DashboardInput from "./dashboardInput/DashboardInput";
import NavComp from "./navComp/NavComp";
import ArticleCard from "../shared/articleCard/ArticleCard";
import useDashboardHook from "@/hooks/useDashboardHook";
import useHomeHook from "@/hooks/useHomeHook";
import Loading from "../shared/loading/Loading";
import Button from "../shared/button/Button";
import { useState } from "react";
import PreviewComp from "./previewComp/PreviewComp";
import FloaraTextEditor from "./floraTextEditor/FloraTextEditor";
const DashboardComp = ({ t, lang }) => {
  const tabsData = [{ name: "add" }, { name: "edit" }];
  const [activeTab, setActiveTab] = useState("add");
  const [showPreviewPopup, setShowPreviewPopup] = useState(false);
  const [data, collectData, handleSubmit, mutation] = useDashboardHook();
  const [articlesData] = useHomeHook();
  if (mutation?.isPending) return <Loading />;
  return (
    <section>
      <div
        className="bg-white position-relative container py-3 px-3 shadow-sm rounded-2"
        style={{ maxWidth: "var(--section-max-width)", minHeight: "90vh" }}
      >
        <NavComp
          tabsData={tabsData}
          t={t}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          lang={lang}
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
              classes="col-12"
            />
            <FloaraTextEditor
              fn={collectData}
              value={data?.article_data_en}
              name="article_data_en"
              type="en"
              placeholder="Write your content here..."
            />
            <FloaraTextEditor
              fn={collectData}
              value={data?.article_data_ar}
              name="article_data_ar"
              type="ar"
              placeholder="أدخل محتوي المقال بالعربي..."
            />
            <div className="col-12 mb-3">
              <Button text={t.submit} type="submit" />
            </div>
            <div className="col-12">
              <Button text={t.preview} fn={() => setShowPreviewPopup(true)} />
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
      {showPreviewPopup && (
        <PreviewComp
          articleToPreview={data}
          setShowPreviewPopup={setShowPreviewPopup}
          t={t}
          lang={lang}
        />
      )}
    </section>
  );
};

export default DashboardComp;
