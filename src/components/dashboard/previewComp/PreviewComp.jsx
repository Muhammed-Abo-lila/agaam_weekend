import { useState } from "react";
import NavComp from "../navComp/NavComp";
import { IoCloseCircleOutline } from "react-icons/io5";
import Image from "next/image";
import "./previewComp.css";
const PreviewComp = ({ articleToPreview, setShowPreviewPopup, t, lang }) => {
  const [activeTab, setActiveTab] = useState("ar");
  const tabsData = [{ name: "ar" }, { name: "en" }];
  return (
    <div
      className="preview-container position-fixed top-0 bottom-0 end-0 start-0 d-flex justify-content-center py-4"
      style={{ backgroundColor: "var(--background-opacity)", zIndex: "100" }}
    >
      <div
        className="bg-white pb-3 px-3 shadow-sm rounded-2 position-relative overflow-auto"
        style={{ maxWidth: "var(--section-max-width)", minWidth: "800px" }}
      >
        <div className="sticky-top bg-white top-0 pt-3">
          <IoCloseCircleOutline
            className="colse position-absolute cursor-pointer text-black fs-4"
            style={{
              top: "20px",
              ...(lang === "ar" ? { left: "30px" } : { right: "30px" }),
            }}
            onClick={() => setShowPreviewPopup(false)}
          />
          <NavComp
            tabsData={tabsData}
            t={t}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            lang={lang}
          />
        </div>
        <div className="article-head border-dashed">
          <div className="image-container">
            <Image
              src={articleToPreview?.meta_data_image_url}
              alt={
                activeTab == "ar"
                  ? articleToPreview?.meta_data_title_ar
                  : articleToPreview?.meta_data_title_en
              }
              fill
              quality={100}
              property="1"
            />
            <div className="image-layer">
              <h2>
                {activeTab == "ar"
                  ? articleToPreview?.meta_data_title_ar
                  : articleToPreview?.meta_data_title_en}
              </h2>
            </div>
          </div>
        </div>
        <div
          className="preview-content rounded-2 py-3 pt-5 px-5 text-black bg-white article-card border-0"
          dir={activeTab == "ar" ? "rtl" : "ltr"}
          style={{
            maxWidth: "var(--section-max-width)",
            width: "100%",
            color: "black !important",
          }}
          dangerouslySetInnerHTML={{
            __html:
              activeTab == "ar"
                ? articleToPreview?.article_data_ar
                : articleToPreview?.article_data_en,
          }}
        ></div>
      </div>
    </div>
  );
};

export default PreviewComp;
