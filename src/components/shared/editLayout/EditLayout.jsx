"use client"
import DashboardInput from "../../dashboard/dashboardInput/DashboardInput";
import LayoutContainer from "../layoutContainer/LayoutContainer";
import Button from "../button/Button";
import FloaraTextEditor from "@/components/dashboard/floraTextEditor/FloraTextEditor";
import useAddAndEditArticle from "@/hooks/useAddAndEditArticle";
import { IoCloseCircleOutline } from "react-icons/io5";
import PreviewComp from "@/components/dashboard/previewComp/PreviewComp";
import { useState } from "react";

const EditLayout = ({ articleID, t, lang, backFn }) => {
  const [showPreviewPopup, setShowPreviewPopup] = useState(false);
  const [data, collectData, handleSubmit] = useAddAndEditArticle(
    "edit",
    articleID,
    backFn
  );
  return (
    <>
      <LayoutContainer>
        <form
          className="p-4 pt-5 row position-relative"
          style={{
            backgroundColor: "var(--white-color)",
            maxWidth: "var(--section-max-width)",
            maxHeight:"95%",
            overflow:"auto",
            direction: "ltr",
          }}
          onSubmit={handleSubmit}
        >
          <IoCloseCircleOutline
            className="position-absolute start-0 fs-4 align-end w-auto cursor-pointer "
            style={{ top: "7px" }}
            onClick={() => backFn()}
          />
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
            placeholder="article number"
            fn={collectData}
            name="article_number"
            value={data?.article_number}
            type="text"
            classes="col-6"
            readOnly
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
          <div className="d-flex justify-content-center align-content-center gap-5">
            <Button text={t.submit} type="submit" />
            <Button text={t.preview} fn={() => setShowPreviewPopup(true)} />
          </div>
        </form>
      </LayoutContainer>
      {showPreviewPopup && (
        <PreviewComp
          articleToPreview={data}
          setShowPreviewPopup={setShowPreviewPopup}
          t={t}
          lang={lang}
        />
      )}
    </>
  );
};
export default EditLayout;
