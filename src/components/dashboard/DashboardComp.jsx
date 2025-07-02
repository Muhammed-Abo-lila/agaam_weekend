"use client";
import DashboardInput from "./dashboardInput/DashboardInput";
import NavComp from "./navComp/NavComp";
import ArticleCard from "../shared/articleCard/ArticleCard";
import useDashboardHook from "@/hooks/useDashboardHook";
import useHomeHook from "@/hooks/useHomeHook";
import Loading from "../shared/loading/Loading";
import Button from "../shared/button/Button";
import { useState } from "react";
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
              placeholder="article img"
              fn={collectData}
              name="art_img"
              value={data?.art_img}
              type="url"
              classes="col-6"
            />
            <DashboardInput
              placeholder="article num"
              fn={collectData}
              name="art_num"
              value={data?.art_num}
              type="number"
              classes="col-6"
            />
            <DashboardInput
              placeholder="title en"
              fn={collectData}
              name="title_en"
              value={data?.title_en}
              type="text"
              classes="col-6"
            />
            <DashboardInput
              placeholder="title ar"
              fn={collectData}
              name="title_ar"
              value={data?.title_ar}
              type="text"
              classes="col-6"
            />
            <DashboardInput
              placeholder="top title en"
              fn={collectData}
              name="top_title_en"
              value={data?.top_title_en}
              type="text"
              classes="col-6"
            />
            <DashboardInput
              placeholder="top title ar"
              fn={collectData}
              name="top_title_ar"
              value={data?.top_title_ar}
              type="text"
              classes="col-6"
            />
            <DashboardInput
              placeholder="desc en"
              fn={collectData}
              name="desc_en"
              value={data?.desc_en}
              type="text"
              classes="col-6"
            />

            <DashboardInput
              placeholder="desc ar"
              fn={collectData}
              name="desc_ar"
              value={data?.desc_ar}
              type="text"
              classes="col-6"
            />

            <DashboardInput
              placeholder="media img"
              fn={collectData}
              name="media_img"
              value={data?.media_img}
              type="url"
              classes="col-12"
            />
            <DashboardInput
              placeholder="iframe"
              fn={collectData}
              name="iframe"
              value={data?.iframe}
              type="url"
              classes="col-12"
            />

            <Button text={t.submit} type="submit" classes=""/>
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
