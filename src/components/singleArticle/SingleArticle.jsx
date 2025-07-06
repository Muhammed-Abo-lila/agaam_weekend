"use client";
import useSingleArticleHook from "@/hooks/useSingleArticleHook";
import Loading from "../shared/loading/Loading";
import { useEffect, useRef } from "react";
const SingleArticle = ({ articleID, lang }) => {
  const articleCardRef = useRef();
  const isArabic = lang == "ar";
  const [singleArticleData, isLoading, isError, error] =
    useSingleArticleHook(articleID);
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
  if (isLoading) return <Loading />;
  if (isError) return <div>error:-{error}</div>;
  return (
    <>
      {singleArticleData && (
        <article
          ref={articleCardRef}
          className="article-card border-0"
          dangerouslySetInnerHTML={{
            __html: isArabic
              ? singleArticleData?.article_data_ar
              : singleArticleData?.article_data_en,
          }}
        ></article>
      )}
    </>
  );
};
export default SingleArticle;
