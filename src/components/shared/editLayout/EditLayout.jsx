import { useEffect, useState } from "react";
import DashboardInput from "../../dashboard/dashboardInput/DashboardInput";
import LayoutContainer from "../layoutContainer/LayoutContainer";
import Button from "../button/Button";
import useSingleArticleHook from "../../../hooks/useSingleArticleHook";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchToUpdateData } from "../../../helpers/fetcher";
const EditLayout = ({ articleID, backFn }) => {
  const queryClient = useQueryClient();
  const [data, setData] = useState({
    image_ar: "",
    title_ar: "",
    desc_ar: "",
    link_ar: "",
    image_en: "",
    title_en: "",
    desc_en: "",
    link_en: "",
  });
  // get single article
  const [singleArticleData] = useSingleArticleHook(articleID);
  useEffect(() => {
    setData({
      image_ar: "",
      title_ar: singleArticleData?.title_ar || "",
      desc_ar: singleArticleData?.desc_ar || "",
      link_ar: singleArticleData?.link_ar || "",
      image_en: "",
      title_en: singleArticleData?.title_en || "",
      desc_en: singleArticleData?.desc_en || "",
      link_en: singleArticleData?.link_en || "",
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
        title_ar: payload.title_ar,
        desc_ar: payload.desc_ar,
        link_ar: payload.link_ar,
        title_en: payload.title_en,
        desc_en: payload.desc_en,
        link_en: payload.link_en,
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
        className="p-4"
        style={{ backgroundColor: "var(--white-color)" }}
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
        <div className="d-flex justify-content-center align-content-center gap-5">
          <Button text={t("back")} fn={backFn} />
          <Button text={t("submit")} type="submit" />
        </div>
      </form>
    </LayoutContainer>
  );
};
export default EditLayout;
