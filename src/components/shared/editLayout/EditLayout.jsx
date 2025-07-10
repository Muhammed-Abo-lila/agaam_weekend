import DashboardInput from "../../dashboard/dashboardInput/DashboardInput";
import LayoutContainer from "../layoutContainer/LayoutContainer";
import Button from "../button/Button";
import FloaraTextEditor from "@/components/dashboard/floraTextEditor/FloraTextEditor";
import useAddAndEditArticle from "@/hooks/useAddAndEditArticle";
const EditLayout = ({ articleID, t, backFn }) => {
  const [data,collectData,handleSubmit]=useAddAndEditArticle("edit",articleID,backFn)
  return (
    <LayoutContainer>
      <form
        className="p-4  row"
        style={{
          backgroundColor: "var(--white-color)",
          maxWidth: "var(--section-max-width)",
          direction: "ltr",
        }}
        onSubmit={handleSubmit}
      >
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
        <div className="d-flex justify-content-center align-content-center gap-5">
          <Button text={t.submit} type="submit" />
          <Button text={t.back} fn={backFn} />
        </div>
      </form>
    </LayoutContainer>
  );
};
export default EditLayout;
