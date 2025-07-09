import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useSingleArticleHook from "./useSingleArticleHook";
import { fetchToPostData, fetchToUpdateData } from "@/helpers/fetcher";
const useAddAndEditArticle = (type, articleID,backFn) => {
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
    article_number: "",
  });
  // get single article
  const [singleArticleData] = useSingleArticleHook(type == "edit" && articleID);
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
      article_number: singleArticleData?.article_number,
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
  const addAndUpdateMutation = useMutation({
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
        article_number: payload?.article_number,
      };
      if (type == "edit") {
        return fetchToUpdateData("articals", formData, articleID);
      } else if (type == "add") {
        return fetchToPostData("articals", formData);
      }
    },
    onSuccess: async () => {
      if (type == "edit") {
        backFn();
        queryClient.invalidateQueries(["singleArticleData", articleID]);
        queryClient.invalidateQueries(["articles"]);
      } else if (type == "add") {
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
          article_number: "",
        });
        queryClient.invalidateQueries(["articles"]);
      }
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    addAndUpdateMutation.mutate(data);
  };
  return [data, collectData, handleSubmit,addAndUpdateMutation];
};
export default useAddAndEditArticle;
