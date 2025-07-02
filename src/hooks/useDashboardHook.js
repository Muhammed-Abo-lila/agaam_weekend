import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { fetchToPostData } from "../helpers/fetcher";
import { supabase } from "../supabaseClient";
const useDashboardHook = () => {
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
      // const file = payload.image_ar;
      // const fileName = `${Date.now()}_${file.name}`;
      // const { data: storageData, error: storageError } = await supabase.storage
      //   .from("new")
      //   .upload(`${Date.now()}_image_`, file);
      // console.log("storageData", storageData);
      // if (storageError) {
      //   throw new Error(storageError.message);
      // }
      // const {
      //   data: publicUrl ,
      // } = supabase.storage.from("new").getPublicUrl(fileName);
      const formData = {
        // up_image: publicUrl,
        // cover_img: publicUrl,
        title_ar: payload.title_ar,
        desc_ar: payload.desc_ar,
        link_ar: payload.link_ar,
        title_en: payload.title_en,
        desc_en: payload.desc_en,
        link_en: payload.link_en,
      };

      return fetchToPostData("articals", formData);
    },
    onSuccess: () => {
      setData({
        image_ar: "",
        title_ar: "",
        desc_ar: "",
        link_ar: "",
        image_en: "",
        title_en: "",
        desc_en: "",
        link_en: "",
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
