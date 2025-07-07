import { useState } from "react";
import NavComp from "../navComp/NavComp";
const PreviewComp = ({ articleToPreview, setShowPreviewPopup, t, lang }) => {
  const [activeTab, setActiveTab] = useState("ar");
  const tabsData=[
    {name:"ar"},
    {name:"en"}
  ]
  return (
    <div 
    className="preview-container position-fixed top-0 bottom-0 end-0 start-0 d-flex justify-content-center py-4 z-1"
    style={{ backgroundColor: "var(--background-opacity)" }}
    >
      <div
        className="bg-white pb-3 px-3 shadow-sm rounded-2 position-relative overflow-auto"
        style={{ minWidth: "var(--section-max-width" }}
      >
        <div className="sticky-top bg-white top-0 pt-3">
          <span
            className="colse position-absolute cursor-pointer text-black"
            style={
              lang === "ar"
                ? { top: "15px", left: "30px" }
                : { top: "15px", right: "30px" }
            }
            onClick={() => setShowPreviewPopup(false)}
          >
            X
          </span>
          <NavComp
          tabsData={tabsData}
            t={t}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            lang={lang}
          />
        </div>
        <div
          className="preview-content rounded-2 py-3 pt-5 px-5 text-black bg-white article-card border-0"
          dir={activeTab == "ar" ? "rtl" : "ltr"}
          style={{ maxWidth: "var(--section-max-width)", width: "100%", color:"black !important"}}
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
