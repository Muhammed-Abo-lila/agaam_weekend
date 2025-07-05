"use client";
import useSingleArticleHook from "@/hooks/useSingleArticleHook";
import Loading from "../shared/loading/Loading";
const SingleArticle = ({ articleID, lang }) => {
  const isArabic = lang == "ar";
  const [singleArticleData, isLoading, isError, error] =
    useSingleArticleHook(articleID);
  if (isLoading) return <Loading />;
  if (isError) return <div>error:-{error}</div>;
  return (
    <>
      {singleArticleData && (
        <article
          className="card border-0"
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
