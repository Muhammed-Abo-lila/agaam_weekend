"use client";
import DashboardInput from "./dashboardInput/DashboardInput";
import NavComp from "./navComp/NavComp";
import ArticleCard from "../shared/articleCard/ArticleCard";
import useDashboardHook from "@/hooks/useDashboardHook";
import useHomeHook from "@/hooks/useHomeHook";
import Loading from "../shared/loading/Loading";
import Button from "../shared/button/Button";

const DashboardComp = ({ t, lang }) => {
  const [data, collectData, handleSubmit, mutation] = useDashboardHook();
  const [articlesData] = useHomeHook();
  if (mutation?.isPending) return <Loading />;

  return (
    <section dir={lang == "ar" ? "rtl" : "ltr"}>
      <div
        className="position-relative container py-3 mt-5 shadow-sm"
        style={{ maxWidth: "1100px", minHeight: "90vh" }}
      >
        <NavComp articlesData={articlesData} t={t} />
        <div className="tab-content">
          <form
            className="tab-pane fade show active"
            id="add"
            role="tabpanel"
            aria-labelledby="add-tab"
            onSubmit={handleSubmit}
          >
            <div className="inputs-container d-flex justify-content-between gap-3">
              <div className="ar-setion w-50" dir="rtl">
                <h2 className="fs-6 text-center fw-medium mb-3">
                  محتوي المقال العربي
                </h2>

                {/* <DashboardInput
                    label="إختر صوره:"
                    fn={collectData}
                    name="image_ar"
                    type="file"
                  /> */}
                <DashboardInput
                  label="أدخل عنوان:"
                  fn={collectData}
                  name="title_ar"
                  value={data?.title_ar}
                  type="text"
                />
                <DashboardInput
                  label="أدخل وصف:"
                  fn={collectData}
                  name="desc_ar"
                  value={data?.desc_ar}
                />
                <DashboardInput
                  label=" أدخل رابط:"
                  fn={collectData}
                  name="link_ar"
                  value={data?.link_ar}
                  type="url"
                />
              </div>

              <div className="en-section w-50">
                <h2 className="fs-6 text-center fw-medium mb-3 text-capitalize">
                  english article content
                </h2>
                {/* <DashboardInput
                  label=" Choose Image:"
                  fn={collectData}
                  name="image_en"
                  type="file"
                /> */}
                <DashboardInput
                  label="Enter Title:"
                  fn={collectData}
                  name="title_en"
                  value={data?.title_en}
                  type="text"
                />
                <DashboardInput
                  label="Enter Description:"
                  fn={collectData}
                  name="desc_en"
                  value={data?.desc_en}
                />
                <DashboardInput
                  label="Enter URL:"
                  fn={collectData}
                  name="link_en"
                  value={data?.link_en}
                  type="url"
                />
              </div>
            </div>
            <Button text={t.submit} type="submit" />
          </form>
          {articlesData && articlesData?.length > 0 && (
            <div
              id="edit"
              className="tab-pane fade p-0 "
              role="tabpanel"
              aria-labelledby="edit-tab"
            >
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
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DashboardComp;
