import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { fetchToPostData } from "../helpers/fetcher";
const useDashboardHook = () => {
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
  const queryClient = useQueryClient();
  // collect data function
  const collectData = (type, value) => {
    setData((prev) => ({
      ...prev,
      [`${type}`]: value,
    }));
  };
  const mutation = useMutation({
    mutationFn: async (payload) => {
      const formData = {
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
      return fetchToPostData("articals", formData);
    },
    onSuccess: () => {
      setData({
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
      queryClient.invalidateQueries(["articles"]);
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(data);
  };
  return [data, collectData, handleSubmit, mutation];
};
export default useDashboardHook;
