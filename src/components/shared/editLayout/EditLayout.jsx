import { useEffect, useState } from "react";
import DashboardInput from "../../dashboard/dashboardInput/DashboardInput";
import LayoutContainer from "../layoutContainer/LayoutContainer";
import Button from "../button/Button";
import useSingleArticleHook from "../../../hooks/useSingleArticleHook";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchToUpdateData } from "../../../helpers/fetcher";
import TextEditor from "@/components/TextEditor";
const EditLayout = ({ articleID, t, backFn }) => {
  const queryClient = useQueryClient();
  const [data, setData] = useState({
    meta_data_title_en: "",
    meta_data_title_ar: "",
    meta_data_desc_en: "",
    meta_data_desc_ar: "",
    meta_data_keywords_en: "",
    meta_data_keywords_ar: "",
    article_data_en: "",
    article_data_ar: "",
    meta_data_image_url: "",
    meta_data_url: "",
  });
  // get single article
  const [singleArticleData] = useSingleArticleHook(articleID);
  useEffect(() => {
    setData({
      meta_data_title_en: singleArticleData?.meta_data_title_en,
      meta_data_title_ar: singleArticleData?.meta_data_title_ar,
      meta_data_desc_en: singleArticleData?.meta_data_desc_en,
      meta_data_desc_ar: singleArticleData?.meta_data_desc_ar,
      meta_data_keywords_en: singleArticleData?.meta_data_keywords_en,
      meta_data_keywords_ar: singleArticleData?.meta_data_keywords_ar,
      article_data_en: singleArticleData?.article_data_en,
      article_data_ar: singleArticleData?.article_data_ar,
      meta_data_image_url: singleArticleData?.meta_data_image_url,
      meta_data_url: singleArticleData?.meta_data_url,
    });
  }, [singleArticleData]);
  // collect data onChange it
  const collectData = (type, value) => {
    setData((prev) => ({
      ...prev,
      [`${type}`]: value,
    }));
  };

  // update article
  const updateMutation = useMutation({
    mutationFn: (payload) => {
      const formData = {
        id: articleID,
        meta_data_title_en: payload?.meta_data_title_en,
        meta_data_title_ar: payload?.meta_data_title_ar,
        meta_data_desc_en: payload?.meta_data_desc_en,
        meta_data_desc_ar: payload?.meta_data_desc_ar,
        meta_data_keywords_en: payload?.meta_data_keywords_en,
        meta_data_keywords_ar: payload?.meta_data_keywords_ar,
        article_data_en: payload?.article_data_en,
        article_data_ar: payload?.article_data_ar,
        meta_data_image_url: payload?.meta_data_image_url,
        meta_data_url: payload?.meta_data_url,
      };
      return fetchToUpdateData("articals", formData, articleID);
    },
    onSuccess: async () => {
      backFn();
      queryClient.invalidateQueries(["singleArticleData", articleID]);
      queryClient.invalidateQueries(["articles"]);
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate(data);
  };
  return (
    <LayoutContainer>
      <form
        className="p-4  row"
        style={{ backgroundColor: "var(--white-color)" ,maxWidth:"1300px",direction:"ltr"}}
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
        <div className="d-flex justify-content-center align-content-center gap-5">
          <Button text={t.submit} type="submit" />
          <Button text={t.back} fn={backFn} />
        </div>
      </form>
    </LayoutContainer>
  );
};
export default EditLayout;
