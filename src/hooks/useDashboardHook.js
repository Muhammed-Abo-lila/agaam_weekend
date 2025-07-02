import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { fetchToPostData } from "../helpers/fetcher";
import { supabase } from "../supabaseClient";
const useDashboardHook = () => {
  const [data, setData] = useState({
    art_img: "",
    art_num: "",
    title_en: "",
    title_ar: "",
    top_title_en: "",
    top_title_ar: "",
    desc_en: "",
    desc_ar: "",
    media_img: "",
    iframe: "",
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
        art_img: payload?.art_img,
        art_num: payload?.art_num,
        title_en: payload?.title_en,
        title_ar: payload?.title_ar,
        top_title_en: payload?.top_title_en,
        top_title_ar: payload?.top_title_ar,
        desc_en: payload?.desc_en,
        desc_ar: payload?.desc_ar,
        media_img: payload?.media_img,
        iframe: payload?.iframe,
      };

      return fetchToPostData("articals", formData);
    },
    onSuccess: () => {
      setData({
        art_img: "",
        art_num: "",
        title_en: "",
        title_ar: "",
        top_title_en: "",
        top_title_ar: "",
        desc_en: "",
        desc_ar: "",
        media_img: "",
        iframe: "",
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
