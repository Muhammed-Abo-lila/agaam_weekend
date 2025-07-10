"use client";
import useSingleArticleHook from "@/hooks/useSingleArticleHook";
import Loading from "../shared/loading/Loading";
import EmptyContent from "../shared/emptyContent/EmptyContent";
import { useEffect } from "react";
import { notFound, useRouter } from "next/navigation";
const SingleArticle = ({ articleID, t, lang }) => {
  const [
    singleArticleData,
    isLoading,
    isError,
    error,
    articleCardRef,
    isArabic,
  ] = useSingleArticleHook(articleID, lang);
  useEffect(() => {
    if (singleArticleData == undefined) {
        notFound();
    }
  }, [singleArticleData]);
  if (isLoading) return <Loading />;
  if (isError) return <div>error: {error}</div>;
  return (
    <>
      {singleArticleData && (
        <>
          {(isArabic && !singleArticleData?.article_data_ar) ||
          (!isArabic && !singleArticleData?.article_data_en) ? (
            <EmptyContent text={t.no_article_lang} />
          ) : (
            <article
              ref={articleCardRef}
              className="article-card border-0"
              dangerouslySetInnerHTML={{
                __html: isArabic
                  ? singleArticleData?.article_data_ar
                  : singleArticleData?.article_data_en,
              }}
            />
          )}
        </>
      )}
    </>
  );
};

export default SingleArticle;
