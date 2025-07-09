import { useQuery } from "@tanstack/react-query";
import { fetchToGetData } from "../helpers/fetcher";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import Loading from "@/components/shared/loading/Loading";
const useSingleArticleHook = (articleID, lang) => {
  const articleCardRef = useRef();
  const isArabic = lang == "ar";
  const {
    data: singleArticleData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["singleArticleData", articleID],
    queryFn: () => fetchToGetData("articals", articleID),
    staleTime: 2 * 60 * 60 * 1000,
  });
  useEffect(() => {
    if (articleCardRef?.current) {
      const allImages = articleCardRef?.current?.querySelectorAll("img");
      allImages.forEach((img) =>
        img.setAttribute(
          "alt",
          isArabic
            ? singleArticleData?.meta_data_title_ar
            : singleArticleData?.meta_data_title_en
        )
      );
    }
  }, [singleArticleData]);
  return [
    singleArticleData,
    isLoading,
    isError,
    error,
    articleCardRef,
    isArabic,
  ];
};
export default useSingleArticleHook;
